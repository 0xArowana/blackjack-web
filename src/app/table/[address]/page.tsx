"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useAccount,
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Close, WarningCircle } from "../../ui/Icons";
import { tokens } from "../../lib/constants";
import { tableAbi } from "../../../abi";
import {
  Address,
  GameStatus,
  SeatInfo,
  TableInfo,
} from "../../lib/definitions";
import { erc20Abi, zeroAddress } from "viem";

interface TableProps {
  params: Promise<{ address: string }>;
}

const Table = ({ params }: TableProps) => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { writeContract } = useWriteContract();
  const [tableAddress, setTableAddress] = useState<Address>();
  const [bet, setBet] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      const address = (await params).address;
      setTableAddress(address as Address);
    })();
  }, []);

  const { data, refetch } = useReadContract({
    address: tableAddress,
    abi: tableAbi,
    functionName: "getTableInfo",
  });

  useWatchContractEvent({
    address: tableAddress,
    abi: tableAbi,
    eventName: "PlayerSeated",
    onLogs: (logs) => {
      console.log("Player seated", logs);
      refetch();
    },
    onError: (error) => console.log("Error", error),
  });

  useWatchContractEvent({
    address: tableAddress,
    abi: tableAbi,
    eventName: "BetsStarted",
    onLogs: (logs) => {
      console.log("Bets started", logs);
      refetch();
    },
    onError: (error) => console.log("Error", error),
  });

  const tableInfo = data as TableInfo;

  const tokenName = useMemo(() => {
    if (!tableInfo) return null;

    const pair = Object.entries(tokens).find(
      ([_, value]) => value.address == tableInfo?.token
    );

    return pair?.[0] ?? "ETH";
  }, [tableInfo]);

  const tokenPrecision = useMemo(() => {
    if (!tableInfo) return null;

    Object.values(tokens).forEach((token) => {
      if (token.address == tableInfo?.token) {
        return token.precision;
      }
    });

    return 18;
  }, [tableInfo]);

  const isLastPlayerToBet = useMemo(() => {
    let currentUserMissingBet = false;
    let otherPlayerMissingBet = false;

    tableInfo?.seats.forEach((seat) => {
      const missingBet = Number(seat.bet) === 0;

      if (seat.player === account.address && missingBet) {
        currentUserMissingBet = true;
      } else if (seat.player !== zeroAddress && missingBet) {
        otherPlayerMissingBet = true;
      }
    });

    return currentUserMissingBet && !otherPlayerMissingBet;
  }, [tableInfo, account.address]);

  console.log("table info", tableInfo);

  const occupiedSeats = useMemo(() => {
    let seatCount = 0;

    tableInfo?.seats.forEach((seat) => {
      if (seat.player === account.address) {
        seatCount++;
      }
    });

    return seatCount;
  }, [tableInfo, account.address]);

  if (!tableAddress || !tableInfo) {
    return <div className="loading loading-spinner loading-lg h-full"></div>;
  }

  const isManager = tableInfo.manager === account.address;
  const gameStarted = ![GameStatus.Bet, GameStatus.Inactive].includes(
    tableInfo.gameStatus
  );

  const getSeatText = (seat: SeatInfo) => {
    if (seat.player === zeroAddress) {
      return isManager || gameStarted ? "EMPTY" : "SIT";
    }

    if (seat.player === account.address) {
      return "YOU";
    }

    return "OCCUPIED";
  };

  const resetBet = () => {
    document.getElementById("bet_amount").value = "";
    setBet(0);
  };

  const placeBet = (amount: number) => {
    writeContract(
      {
        abi: tableAbi,
        address: tableAddress,
        functionName: "placeBet",
        args: [amount],
      },
      {
        onError: (e) => {
          console.log(e);
        },
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div>
      <div className="flex flex-row gap-4 mt-10">
        {tableInfo.seats.map((seat, index) => {
          const isEmpty = seat.player === zeroAddress;
          const isCurrentUser = seat.player === account.address;
          const canSit = !isManager && isEmpty && !gameStarted;

          return (
            <div
              className={`flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow ${canSit ? `hover:bg-gray-100 dark:bg-gray-800 cursor-pointer` : ""} gap-2`}
              key={`table-spot-${index}`}
              onClick={() => {
                if (!canSit) return;

                if (!account.address) {
                  openConnectModal?.();
                  return;
                }

                writeContract(
                  {
                    abi: tableAbi,
                    address: tableAddress,
                    functionName: "sit",
                    args: [index],
                  },
                  {
                    onError: (e) => {
                      console.log(e);
                    },
                    onSuccess: () => {
                      refetch();
                    },
                  }
                );
              }}
            >
              {getSeatText(seat)}
              {isCurrentUser && !gameStarted && (
                <button
                  onClick={() => {
                    writeContract(
                      {
                        abi: tableAbi,
                        address: tableAddress,
                        functionName: "leave",
                        args: [index],
                      },
                      {
                        onError: (e) => {
                          console.log(e);
                        },
                        onSuccess: () => {
                          refetch();
                        },
                      }
                    );
                  }}
                  className="btn"
                >
                  Leave
                </button>
              )}
              {isCurrentUser && tableInfo.gameStatus == GameStatus.Bet && (
                <button
                  onClick={() => {
                    refetch();
                    document.getElementById("bet_modal")?.showModal();
                  }}
                  className="btn"
                >
                  Place Bet
                </button>
              )}
            </div>
          );
        })}
      </div>
      <dialog id="bet_modal" className="modal">
        <div className="modal-box flex flex-col">
          <div className="self-end">
            <form method="dialog">
              <button
                onClick={() => {
                  resetBet();
                }}
              >
                <Close />
              </button>
            </form>
          </div>
          <div className="text-xl font-semibold self-center">Place Bet</div>
          {error && (
            <div role="alert" className="alert alert-error mt-10">
              <span className="text-white">{error}</span>
            </div>
          )}
          <div className="flex flex-col py-4 gap-8">
            <div className="flex flex-col gap-2">
              <div>
                {isLastPlayerToBet && "You are the last player to place a bet."}
              </div>
              <div>
                {`When ${isLastPlayerToBet ? "you place your" : "the last player places their"} bet, the game will be started.`}
              </div>
            </div>
            <label className="flex label cursor-pointer items-between h-14">
              <div className="flex items-center gap-2">
                <span>{`Bet amount (${tokenName})`}</span>
                {tokenName !== "ETH" && (
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={`Note: You will be prompted for 2 transactions: one to approve the transfer of ${tokenName} and another to actually send the deposit amount in ${tokenName}. You must first approve the transfer of ${tokenName} and then send the deposit amount.`}
                  >
                    <WarningCircle />
                  </div>
                )}
              </div>
              <input
                id="bet_amount"
                type="number"
                placeholder="0.00"
                className="input input-bordered w-36"
                onChange={(e) => {
                  setError(undefined);
                  setBet(+e.target.value);
                }}
                disabled={loading}
              />
            </label>
            {occupiedSeats > 1 && (
              <div>
                {`You are currently occupying ${occupiedSeats} seats. The total bet amount sent will be ${occupiedSeats * bet} ${tokenName}.`}
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary rounded-2xl mt-4"
            disabled={loading}
            onClick={() => {
              const amount = bet * 10 ** (tokenPrecision ?? 18);

              if (amount < tableInfo.betRange.min) {
                setError("Bet is less than minimum");
                return;
              }

              if (amount > tableInfo.betRange.max) {
                setError("Bet is greater than maximum");
                return;
              }

              if (tableInfo.token !== zeroAddress) {
                writeContract(
                  {
                    abi: erc20Abi,
                    address: tableInfo.token,
                    functionName: "approve",
                    args: [tableAddress, BigInt(amount * occupiedSeats)],
                  },
                  {
                    onError: (e) => {
                      console.log(e);
                    },
                    onSuccess: () => {
                      placeBet(amount);
                    },
                  }
                );
              } else {
                placeBet(amount);
              }
            }}
          >
            {!loading ? (
              "Place bet"
            ) : (
              <span className="loading loading-spinner loading-sm" />
            )}
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Table;

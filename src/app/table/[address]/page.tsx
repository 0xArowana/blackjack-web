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
import Image from "next/image";
import { tableAbi } from "../../../abi";
import {
  Address,
  GameStatus,
  Seat,
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

  const { data: tableData, refetch } = useReadContract({
    address: tableAddress,
    abi: tableAbi,
    functionName: "getTableInfo",
  });

  const table = tableData as TableInfo;

  const { data: seatData } = useReadContract({
    address: tableAddress,
    abi: tableAbi,
    functionName: "getSeats",
  });

  const seats = seatData as Seat[];

  console.log("SeAtS", seats);

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

  const isLastPlayerToBet = useMemo(() => {
    let currentUserMissingBet = false;
    let otherPlayerMissingBet = false;

    table?.seats.forEach((seat) => {
      const missingBet = Number(seat.bet) === 0;

      if (seat.player === account.address && missingBet) {
        currentUserMissingBet = true;
      } else if (seat.player !== zeroAddress && missingBet) {
        otherPlayerMissingBet = true;
      }
    });

    return currentUserMissingBet && !otherPlayerMissingBet;
  }, [table, account.address]);

  const occupiedSeats = useMemo(() => {
    let seatCount = 0;

    table?.seats.forEach((seat) => {
      if (seat.player === account.address) {
        seatCount++;
      }
    });

    return seatCount;
  }, [table, account.address]);

  if (!tableAddress || !table) {
    return <div className="loading loading-spinner loading-lg h-full"></div>;
  }

  const isManager = table.manager === account.address;
  const gameStarted = ![GameStatus.Bet, GameStatus.Inactive].includes(
    table.gameStatus
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

  if (!table) {
    return (
      <>
        <span className="loading loading-spinner loading-lg" />
        <div>Connecting...</div>
      </>
    );
  }

  const seatCount = table.seats.length;

  return (
    <div
      className="flex flex-col h-full w-full py-[10%] items-center justify-between"
      style={{ background: "radial-gradient(#4ea851, #295d2d)" }}
    >
      <div
        className="flex justify-center items-center flex-col p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800"
        style={{ height: 140, width: 100 }}
      >
        DEALER
      </div>

      <div className="flex flex-row" style={{ gap: 200 / seatCount }}>
        {table.seats.map((seat, index) => {
          const isEmpty = seat.player === zeroAddress;
          const isCurrentUser = seat.player === account.address;
          const canSit = !isManager && isEmpty && !gameStarted;
          const hands = seats[index].hands;
          const currentHand = hands[hands.length - 1];

          const rotation = 20 - (40 / (seatCount - 1)) * index;

          return (
            <div
              style={{
                transform: `rotate(${rotation}deg)`,
                marginTop:
                  (seatCount * -Math.abs(rotation ** 2)) / Math.PI / 13,
              }}
            >
              <div
                className={`flex justify-center items-center flex-col p-6 ${canSit ? `dark:bg-gray-800 cursor-pointer` : ""} gap-2`}
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
                <div className="z-10">
                  {currentHand?.cards.map((c, i) => (
                    <Image
                      src={`/card${c}.svg`}
                      alt={`card${c}`}
                      width={100}
                      height={140}
                      className="shadow-md z-10 relative rounded-md"
                      style={{ marginTop: -120, marginLeft: i * 30 }}
                    />
                  ))}
                </div>
                <div
                  className="rounded-md outline-amber-300 outline outline-4 opacity-50"
                  style={{ width: 100, height: 140, marginTop: -40 }}
                />
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
                {isCurrentUser && table.gameStatus == GameStatus.Bet && (
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
                <span>{`Bet amount (${table.tokenInfo.symbol})`}</span>
                {table.tokenInfo.symbol !== "ETH" && (
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={`Note: You will be prompted for 2 transactions: one to approve the transfer of ${table.tokenInfo.symbol} and another to actually send the deposit amount in ${table.tokenInfo.symbol}. You must first approve the transfer of ${table.tokenInfo.symbol} and then send the deposit amount.`}
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
                {`You are currently occupying ${occupiedSeats} seats. The total bet amount sent will be ${occupiedSeats * bet} ${table.tokenInfo.symbol}.`}
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary rounded-2xl mt-4"
            disabled={loading}
            onClick={() => {
              const amount = bet * 10 ** table.tokenInfo.decimals;

              if (amount < table.betRange.min) {
                setError("Bet is less than minimum");
                return;
              }

              if (amount > table.betRange.max) {
                setError("Bet is greater than maximum");
                return;
              }

              if (table.tokenInfo.id !== zeroAddress) {
                writeContract(
                  {
                    abi: erc20Abi,
                    address: table.tokenInfo.id,
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

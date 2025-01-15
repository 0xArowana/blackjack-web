"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { tableAbi } from "../../../abi";
import {
  Address,
  GameStatus,
  PlayerState,
  TableInfo,
} from "../../lib/definitions";

interface TableProps {
  params: Promise<{ address: string }>;
}

const Table = ({ params }: TableProps) => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { writeContract } = useWriteContract();
  const [tableAddress, setTableAddress] = useState<Address>();
  const [spots, setSpots] = useState<(PlayerState | undefined)[]>([]);
  const [playerState, setPlayerState] = useState<PlayerState | undefined>();

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

  const tableInfo = data as TableInfo;

  useEffect(() => {
    if (!tableInfo) return;

    const newSpots: (PlayerState | undefined)[] = [];

    for (let i = 0; i < tableInfo.maxPlayers; i++) {
      const spot = tableInfo.playerStates.find((p) => p.seat === i + 1);
      newSpots.push(spot);
    }

    setSpots(newSpots);

    const playerIndex = tableInfo.players.findIndex(
      (p) => p === account.address
    );

    if (playerIndex !== -1) {
      setPlayerState(tableInfo.playerStates[playerIndex]);
    }
  }, [tableInfo]);

  if (!tableAddress || !tableInfo) {
    return <div className="loading loading-spinner loading-lg h-full"></div>;
  }

  const isManager = tableInfo.manager === account.address;
  const canSit =
    !isManager &&
    !playerState &&
    (tableInfo.gameStatus === GameStatus.Inactive ||
      tableInfo.gameStatus === GameStatus.Bet);

  return (
    <div>
      <div className="flex flex-row gap-4 mt-10">
        {spots?.map((spot, index) => {
          return (
            <div
              className={`flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow ${!spot && canSit ? `hover:bg-gray-100 dark:bg-gray-800 cursor-pointer` : ""} gap-2`}
              key={`table-spot-${index}`}
              onClick={() => {
                if (!!spot || !canSit) return;

                if (!account.address) {
                  openConnectModal?.();
                  return;
                }

                writeContract(
                  {
                    abi: tableAbi,
                    address: tableAddress,
                    functionName: "sit",
                    args: [index + 1],
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
              {!spot
                ? isManager || !!playerState
                  ? "EMPTY"
                  : "SIT"
                : "SOMEBODY"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;

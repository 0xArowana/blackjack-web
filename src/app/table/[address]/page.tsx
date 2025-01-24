"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
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

  const tableInfo = data as TableInfo;

  if (!tableAddress || !tableInfo) {
    return <div className="loading loading-spinner loading-lg h-full"></div>;
  }

  const isManager = tableInfo.manager === account.address;

  return (
    <div>
      <div className="flex flex-row gap-4 mt-10">
        {Array.from(Array(tableInfo.seatCount).keys()).map((index) => {
          const seat = tableInfo.seats[index];
          const canSit = !isManager && !seat;

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
              {!seat ? (isManager ? "EMPTY" : "SIT") : "SOMEBODY"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;

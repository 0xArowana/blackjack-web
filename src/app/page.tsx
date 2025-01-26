"use client";

import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWatchContractEvent,
} from "wagmi";
import { pitAbi } from "../abi";
import { useEffect, useState } from "react";
import { ContractFunctionParameters, zeroAddress } from "viem";
import { pitAddress, tokens } from "./lib/constants";
import CreateTableModal from "./ui/CreateTableModal";
import { TableInfo } from "./lib/definitions";

const App = () => {
  const account = useAccount();
  const isConnected = account.status === "connected";

  const { data } = useReadContract({
    address: pitAddress,
    abi: pitAbi,
    functionName: "getPlayerTableInfo",
    args: [account.address],
  });

  const getTokenName = (address: string) => {
    const pair = Object.entries(tokens).find(
      ([_, value]) => value.address == address
    );
    return pair?.[0] ?? "ETH";
  };

  const table = data as TableInfo;
  const players = table?.seats.filter((s) => s.player !== zeroAddress);

  return (
    <>
      PLAYER
      <div className="flex justify-center">
        {isConnected ? (
          <div className="flex flex-col gap-4 w-9/12">
            {!!table && (
              <>
                <h1>My Table</h1>
                <div className="flex flex-wrap gap-4">
                  <a
                    className="flex flex-col w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 gap-2"
                    key={`table-card-${table.id}`}
                    href={`/table/${table.id}`}
                  >
                    <div
                      className="tooltip before:max-w-none"
                      data-tip={table.id}
                    >
                      <div className="truncate">{table.id}</div>
                    </div>
                    <div>{`Token = ${getTokenName(table.token)}`}</div>
                    <div>{`Players = ${players.length}/${table.seats.length}`}</div>
                  </a>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>Please connect your wallet</div>
        )}
      </div>
      <CreateTableModal />
    </>
  );
};

export default App;

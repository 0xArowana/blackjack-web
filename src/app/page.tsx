"use client";

import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWatchContractEvent,
} from "wagmi";
import { pitAbi, tableAbi } from "../abi";
import { useEffect, useState } from "react";
import { ContractFunctionParameters } from "viem";
import { pitAddress, tokens } from "./lib/constants";
import CreateTableModal from "./ui/CreateTableModal";

const App = () => {
  const account = useAccount();
  const isConnected = account.status === "connected";

  const { data: tableAddress } = useReadContract({
    address: pitAddress,
    abi: pitAbi,
    functionName: "getPlayerTable",
    args: [account.address],
  });

  const { data: tableInfo } = useReadContract({
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

  console.log("table info", tableInfo);

  return (
    <>
      PLAYER
      <div className="flex justify-center">
        {isConnected ? (
          <div className="flex flex-col gap-4 w-9/12">
            <h1>My Table</h1>
            <div className="flex flex-wrap gap-4">
              {/* <a
                className="flex flex-col w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 gap-2"
                key={`table-card-${tableInfo.id}`}
                href={`/table/${tableAddress}`}
              >
                <div
                  className="tooltip before:max-w-none"
                  data-tip={tableAddress}
                >
                  <div className="truncate">{tableAddress}</div>
                </div>
                <div>{`Token = ${getTokenName(info.token)}`}</div>
                <div>{`Players = ${info.players.length}`}</div>
              </a> */}
            </div>
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

"use client";

import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { zeroAddress } from "viem";
import { DoubleRule } from "../lib/definitions";
import { Close } from "../ui/Icons";
import { pitAbi } from "../../abi";
import { pitAddress, tokens } from "../lib/constants";

const CreateTableModal = () => {
  const { writeContract } = useWriteContract();

  const [maxPlayers, setMaxPlayers] = useState(7);
  const [minBet, setMinBet] = useState<number | undefined>();
  const [maxBet, setMaxBet] = useState<number | undefined>();
  const [currency, setCurrency] = useState<string>("ETH");
  const [deckCount, setDeckCount] = useState(8);
  const [dealerHitOnSoft17, setDealerHitOnSoft17] = useState(false);
  const [allowDoubleAfterSplit, setAllowDoubleAfterSplit] = useState(false);
  const [doubleRule, setDoubleRule] = useState(DoubleRule.Any);
  const [maxResplitHands, setMaxResplitHands] = useState(4);
  const [allowResplitAces, setAllowResplitAces] = useState(false);
  const [allowHitSplitAces, setAllowHitSplitAces] = useState(false);
  const [allowLateSurrender, setAllowLateSurrender] = useState(false);
  const [allowInsurance, setAllowInsurance] = useState(false);
  const [isSixToFivePayout, setIsSixToFivePayout] = useState(false);
  const [isBetRangeInvalid, setIsBetRangeInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const getDoubleRuleText = (rule: DoubleRule) => {
    switch (rule) {
      case DoubleRule.NineToEleven:
        return "9-11 only";
      case DoubleRule.TenToEleven:
        return "10 or 11 only";
      default:
        return "Any first two cards";
    }
  };

  const getBlackjackPayoutText = (sixToFive: boolean) => {
    return sixToFive ? "6:5" : "3:2";
  };

  const onSelectDoubleRule = (rule: DoubleRule) => {
    hideDropdown();
    setDoubleRule(rule);
  };

  const getMaxResplitHandsText = (hands: number) => {
    return `${hands} hands`;
  };

  const hideDropdown = () => {
    const selected = document.activeElement;
    selected?.blur();
  };

  const onSelectCurrency = (c: string) => {
    hideDropdown();
    setCurrency(c);
  };

  const onSelectDeckCount = (count: number) => {
    hideDropdown();
    setDeckCount(count);
  };

  const onSelectMaxResplitHands = (hands: number) => {
    hideDropdown();
    setMaxResplitHands(hands);
  };

  const onSelectMaxPlayers = (players: number) => {
    hideDropdown();
    setMaxPlayers(players);
  };

  const onSelectBlackjackPayout = (sixToFive: boolean) => {
    hideDropdown();
    setIsSixToFivePayout(sixToFive);
  };

  const reset = () => {
    setLoading(false);
    setMaxPlayers(7);
    setMinBet(undefined);
    setMaxBet(undefined);
    setCurrency("ETH");
    setDeckCount(8);
    setDealerHitOnSoft17(false);
    setAllowDoubleAfterSplit(false);
    setDoubleRule(DoubleRule.Any);
    setMaxResplitHands(4);
    setAllowResplitAces(false);
    setAllowHitSplitAces(false);
    setAllowLateSurrender(false);
    setAllowInsurance(false);
    setIsSixToFivePayout(false);
    document.getElementById("min_bet").value = "";
    document.getElementById("max_bet").value = "";
  };

  return (
    <dialog id="create_table_modal" className="modal">
      <div className="modal-box flex flex-col w-11/12 max-w-5xl">
        <div className="self-end">
          <form method="dialog">
            <button onClick={reset}>
              <Close />
            </button>
          </form>
        </div>
        <div className="text-xl font-semibold self-center">Create Table</div>
        <div className="py-4 gap-4 grid grid-cols-2 grid-cols-1 md:grid-cols-2">
          <label className="flex label cursor-pointer items-between h-14">
            <span>Currency</span>
            <div
              className={`dropdown dropdown-left ${loading ? "pointer-events-none" : ""}`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn m-1 h-10 ${loading ? "text-gray-400" : ""}`}
              >
                {currency}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
              >
                {["ETH", ...Object.keys(tokens)].map((c) => (
                  <li onClick={() => onSelectCurrency(c)}>
                    <a>{c}</a>
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Bet range</span>
            <div className="flex items-center gap-2 w-64">
              <input
                id="min_bet"
                type="number"
                placeholder="Min"
                className={`input input-bordered w-full max-w-xs ${isBetRangeInvalid ? "input-error" : ""}`}
                onChange={(e) => {
                  setMinBet(+e.target.value);
                  setIsBetRangeInvalid(false);
                }}
                disabled={loading}
              />
              {" - "}
              <input
                id="max_bet"
                type="number"
                placeholder="Max"
                className={`input input-bordered w-full max-w-xs ${isBetRangeInvalid ? "input-error" : ""}`}
                onChange={(e) => {
                  setMaxBet(+e.target.value);
                  setIsBetRangeInvalid(false);
                }}
                disabled={loading}
              />
            </div>
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Max players</span>
            <div
              className={`dropdown dropdown-left ${loading ? "pointer-events-none" : ""}`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn m-1 h-10 ${loading ? "text-gray-400" : ""}`}
              >
                {maxPlayers}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((players) => (
                  <li onClick={() => onSelectMaxPlayers(players)}>
                    <a>{players}</a>
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Blackjack payout</span>
            <div
              className={`dropdown dropdown-left ${loading ? "pointer-events-none" : ""}`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn m-1 h-10 ${loading ? "text-gray-400" : ""}`}
              >
                {getBlackjackPayoutText(isSixToFivePayout)}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
              >
                {[false, true].map((payout) => (
                  <li onClick={() => onSelectBlackjackPayout(payout)}>
                    <a>{getBlackjackPayoutText(payout)}</a>
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Number of decks</span>
            <div
              className={`dropdown dropdown-left ${loading ? "pointer-events-none" : ""}`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn m-1 h-10 ${loading ? "text-gray-400" : ""}`}
              >
                {deckCount}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
              >
                {[1, 2, 4, 5, 6, 8].map((deckCount) => (
                  <li onClick={() => onSelectDeckCount(deckCount)}>
                    <a>{deckCount}</a>
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Allow double on</span>
            <div
              className={`dropdown dropdown-left ${loading ? "pointer-events-none" : ""}`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn m-1 h-10 ${loading ? "text-gray-400" : ""}`}
              >
                {getDoubleRuleText(doubleRule)}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
                style={{ width: 200 }}
              >
                {[
                  DoubleRule.Any,
                  DoubleRule.NineToEleven,
                  DoubleRule.TenToEleven,
                ].map((rule) => (
                  <li onClick={() => onSelectDoubleRule(rule)}>
                    <a>{getDoubleRuleText(rule)}</a>
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Allow player to split to</span>
            <div
              className={`dropdown dropdown-left ${loading ? "pointer-events-none" : ""}`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn m-1 h-10 ${loading ? "text-gray-400" : ""}`}
              >
                {getMaxResplitHandsText(maxResplitHands)}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
                style={{ width: 110 }}
              >
                {[2, 3, 4].map((hands) => (
                  <li onClick={() => onSelectMaxResplitHands(hands)}>
                    <a>{getMaxResplitHandsText(hands)}</a>
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Allow double after split</span>
            <input
              type="checkbox"
              className="toggle"
              defaultChecked
              onChange={(event) => {
                setAllowDoubleAfterSplit(event.target.checked);
              }}
              disabled={loading}
            />
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Allow splitting aces</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={(event) => {
                setAllowResplitAces(event.target.checked);
              }}
              disabled={loading}
            />
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Allow hitting split aces</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={(event) => {
                setAllowHitSplitAces(event.target.checked);
              }}
              disabled={loading}
            />
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Allow late surrender</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={(event) => {
                setAllowLateSurrender(event.target.checked);
              }}
              disabled={loading}
            />
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Dealer hits on soft 17</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={(event) => {
                setDealerHitOnSoft17(event.target.checked);
              }}
              disabled={loading}
            />
          </label>
          <label className="flex label cursor-pointer items-between h-14">
            <span>Allow insurance</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={(event) => {
                setAllowInsurance(event.target.checked);
              }}
              disabled={loading}
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary rounded-2xl"
          disabled={loading}
          onClick={() => {
            const token = tokens[currency];
            const precision = token?.precision ?? 18;
            const minBetInt = Math.floor((minBet ?? 0) * 10 ** precision);
            const maxBetInt = Math.floor((maxBet ?? 0) * 10 ** precision);

            if (minBetInt <= 0 || maxBetInt <= 0 || minBetInt > maxBetInt) {
              setIsBetRangeInvalid(true);
              return;
            }

            setLoading(true);

            writeContract(
              {
                abi: pitAbi,
                address: pitAddress,
                functionName: "createTable",
                args: [
                  maxPlayers,
                  [minBetInt, maxBetInt],
                  [
                    deckCount,
                    dealerHitOnSoft17,
                    allowDoubleAfterSplit,
                    doubleRule,
                    maxResplitHands,
                    allowResplitAces,
                    allowHitSplitAces,
                    allowLateSurrender,
                    allowInsurance,
                    isSixToFivePayout,
                  ],
                  token?.address ?? zeroAddress,
                ],
              },
              {
                onError: (e) => {
                  console.log(e);
                },
                onSuccess: () => {
                  document.getElementById("create_table_modal")?.close();
                },
                onSettled: () => {
                  setLoading(false);
                },
              }
            );
          }}
        >
          {!loading ? (
            "Create"
          ) : (
            <span className="loading loading-spinner loading-sm" />
          )}
        </button>
      </div>
    </dialog>
  );
};

export default CreateTableModal;

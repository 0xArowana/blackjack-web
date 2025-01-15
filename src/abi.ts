export const pitAbi = [
  {
    type: "function",
    name: "UPGRADE_INTERFACE_VERSION",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createTable",
    inputs: [
      {
        name: "_maxPlayers",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "_betRange",
        type: "tuple",
        internalType: "struct Table.BetRange",
        components: [
          {
            name: "min",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "max",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "_rules",
        type: "tuple",
        internalType: "struct Table.Rules",
        components: [
          {
            name: "deckCount",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "dealerHitOnSoft17",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowDoubleAfterSplit",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "doubleRule",
            type: "uint8",
            internalType: "enum Table.DoubleRule",
          },
          {
            name: "maxResplitHands",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "allowResplitAces",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowHitSplitAces",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowLateSurrender",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowInsurance",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "sixToFive",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decreaseMaxPayout",
    inputs: [
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deposit",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "gameEnded",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_earnings",
        type: "int256",
        internalType: "int256",
      },
      {
        name: "_gameMaxPayout",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getTables",
    inputs: [
      {
        name: "_manager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "increaseMaxPayout",
    inputs: [
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_tokens",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_pool",
        type: "address",
        internalType: "address",
      },
      {
        name: "_playerTimeout",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_vrfConfig",
        type: "tuple",
        internalType: "struct Pit.VrfConfig",
        components: [
          {
            name: "coordinator",
            type: "address",
            internalType: "address",
          },
          {
            name: "keyHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "subscriptionId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "callbackGasLimit",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rawFulfillRandomWords",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "randomWords",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestRandomWords",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "s_managerToTables",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_managerToTokenToState",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "maxPayout",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_playerTimeout",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_tableToManager",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_vrfRequests",
    inputs: [
      {
        name: "_requestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setPlayerTimeout",
    inputs: [
      {
        name: "_seconds",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTokens",
    inputs: [
      {
        name: "_tokens",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Received",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TableCreated",
    inputs: [
      {
        name: "tableAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "managerAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "betRange",
        type: "tuple",
        indexed: false,
        internalType: "struct Table.BetRange",
        components: [
          {
            name: "min",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "max",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Upgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1167FailedCreateClone",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC1967InvalidImplementation",
    inputs: [
      {
        name: "implementation",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1967NonPayable",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedInnerCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "OnlyCoordinatorCanFulfill",
    inputs: [
      {
        name: "have",
        type: "address",
        internalType: "address",
      },
      {
        name: "want",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "Pit__CurrencyNotEth",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__InsufficientBalance",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__InsufficientManagerBalance",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__InvalidDeckCount",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__InvalidEarningsAmountSent",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__InvalidMaxPlayers",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__InvalidMaxResplitHands",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__NotApprovedToken",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__NotManager",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__NotTable",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__TokenTransferFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "Pit__VrfRequestNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "UUPSUnauthorizedCallContext",
    inputs: [],
  },
  {
    type: "error",
    name: "UUPSUnsupportedProxiableUUID",
    inputs: [
      {
        name: "slot",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
];

export const tableAbi = [
  {
    type: "function",
    name: "cashOut",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "clearDebt",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "double",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getTableInfo",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Table.TableInfo",
        components: [
          {
            name: "manager",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "gameStatus",
            type: "uint8",
            internalType: "enum Table.GameStatus",
          },
          {
            name: "players",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "playerStates",
            type: "tuple[]",
            internalType: "struct Table.PlayerState[]",
            components: [
              {
                name: "seat",
                type: "uint8",
                internalType: "uint8",
              },
              {
                name: "bet",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "hands",
                type: "tuple[]",
                internalType: "struct Table.Hand[]",
                components: [
                  {
                    name: "cards",
                    type: "uint8[]",
                    internalType: "uint8[]",
                  },
                  {
                    name: "minValue",
                    type: "uint8",
                    internalType: "uint8",
                  },
                  {
                    name: "aceCount",
                    type: "uint8",
                    internalType: "uint8",
                  },
                  {
                    name: "status",
                    type: "uint8",
                    internalType: "enum Table.HandStatus",
                  },
                  {
                    name: "doubled",
                    type: "bool",
                    internalType: "bool",
                  },
                ],
              },
              {
                name: "balance",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "rules",
            type: "tuple",
            internalType: "struct Table.Rules",
            components: [
              {
                name: "deckCount",
                type: "uint8",
                internalType: "uint8",
              },
              {
                name: "dealerHitOnSoft17",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "allowDoubleAfterSplit",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "doubleRule",
                type: "uint8",
                internalType: "enum Table.DoubleRule",
              },
              {
                name: "maxResplitHands",
                type: "uint8",
                internalType: "uint8",
              },
              {
                name: "allowResplitAces",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "allowHitSplitAces",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "allowLateSurrender",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "allowInsurance",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "sixToFive",
                type: "bool",
                internalType: "bool",
              },
            ],
          },
          {
            name: "maxPlayers",
            type: "uint8",
            internalType: "uint8",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hit",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_manager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_maxPlayers",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "_betRange",
        type: "tuple",
        internalType: "struct Table.BetRange",
        components: [
          {
            name: "min",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "max",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "_rules",
        type: "tuple",
        internalType: "struct Table.Rules",
        components: [
          {
            name: "deckCount",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "dealerHitOnSoft17",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowDoubleAfterSplit",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "doubleRule",
            type: "uint8",
            internalType: "enum Table.DoubleRule",
          },
          {
            name: "maxResplitHands",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "allowResplitAces",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowHitSplitAces",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowLateSurrender",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowInsurance",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "sixToFive",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "leave",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "lock",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "placeBet",
    inputs: [
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "s_gameStatus",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum Table.GameStatus",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_lockTimestamp",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_manager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_playerToState",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "seat",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "bet",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_players",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_seatToPlayer",
    inputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_seatToWaitingPlayer",
    inputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_token",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setBetRange",
    inputs: [
      {
        name: "_betRange",
        type: "tuple",
        internalType: "struct Table.BetRange",
        components: [
          {
            name: "min",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "max",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMaxPlayers",
    inputs: [
      {
        name: "_maxPlayers",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRandomWords",
    inputs: [
      {
        name: "_randomWords",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setToken",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sit",
    inputs: [
      {
        name: "_seat",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "split",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "stand",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "startBets",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unlock",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BetsStarted",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "GameStarted",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Hit",
    inputs: [
      {
        name: "card",
        type: "uint8",
        indexed: true,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TableLocked",
    inputs: [],
    anonymous: false,
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__BetAlreadyPlaced",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__BetExceedsMax",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__BetLessThanMin",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__BettingInProgress",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__CannotDoubleAfterHit",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__CannotSplitAfterHit",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__CannotSplitOnDifferentCards",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__CashOutTransferFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__CurrencyNotEth",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__GameInProgress",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__HandNotNineToEleven",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__HandNotTenToEleven",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__InsufficientBet",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__InvalidDebtClearanceAmount",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__InvalidMaxPlayers",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__InvalidPlayer",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__InvalidSeat",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__Locked",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__MaxResplitHandsReached",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NoActiveHand",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NoBalanceAvailable",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NoCards",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NotBetStatus",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NotCurrentPlayer",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NotEmpty",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NotInactiveStatus",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NotManager",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__NotPlayerTurnStatus",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__PlayerNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__SeatOccupied",
    inputs: [],
  },
  {
    type: "error",
    name: "Table__TokenTransferFailed",
    inputs: [],
  },
];

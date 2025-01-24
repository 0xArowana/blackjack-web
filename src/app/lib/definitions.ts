export enum DoubleRule {
  Any,
  NineToEleven,
  TenToEleven,
}

export type Token = {
  address: string;
  precision: number;
};

export enum GameStatus {
  Inactive,
  Bet,
  Pending,
  Insurance,
  PlayerTurn,
  DealerTurn,
}

export enum HandStatus {
  Active,
  Stand,
  Bust,
}

export type Rules = {
  deckCount: number;
  dealerHitOnSoft17: boolean;
  allowDoubleAfterSplit: boolean;
  doubleRule: DoubleRule;
  maxResplitHands: number;
  allowResplitAces: boolean;
  allowHitSplitAces: boolean;
  allowLateSurrender: boolean;
  allowInsurance: boolean;
  sixToFive: boolean;
};

export type Hand = {
  cards: number[];
  minValue: number;
  aceCount: number;
  status: HandStatus;
  doubled: boolean;
};

export type PlayerState = {
  seat: number;
  bet: number;
  hands: Hand[];
  balance: number;
};

export type TableInfo = {
  id: Address;
  manager: Address;
  token: Address;
  gameStatus: GameStatus;
  seats: SeatInfo[];
  seatCount: number;
  rules: Rules;
};

export type SeatInfo = {
  player: Address;
  bet: number;
  waiting: boolean;
};

export type Address = `0x${string}`;

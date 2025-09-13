export interface SignUpData {
  name: string;
  username: string;
  password: string;
  gender: string;
}

export interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioButtonProps {
  id: string;
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type CardType = "saving" | "expense" | "investment";


// Define the shape of the data - GET_AUTHENTICATED_USER query returns
export type AuthenticatedUserData = {
  authUser: {
    id: string;
    username: string;
    email: string;
    // add any other fields your query returns
  } | null;
};


export interface Transaction {
  _id: string;
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location?: string|null;
  date: string|number;
}

export interface GetTransactionsData {
  transactions: Transaction[];
}

export interface CardProps {
  transaction: Transaction;
}

export type GetTransactionResponse = {
  transaction: Transaction;
};

export interface CategoryStat {
  category: "saving" | "expense" | "investment" | string; // add more if needed
  totalAmount: number;
}

export interface TransactionStatsData {
  categoryStatistics: CategoryStat[];
}

export interface AuthUser {
  profilePicture: string;
  _id: string
  // add other fields if your query returns them
}

export interface AuthUserData {
  authUser: AuthUser;
}

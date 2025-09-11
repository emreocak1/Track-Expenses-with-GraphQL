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

export interface CardProps {
  cardType: CardType;
}

export type SelectOption =
  | string
  | {
      value: string;
      label: string;
      hint?: string;
    };

export interface SelectFieldProps {
  id: string;
  name: string;
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  ariaLabel?: string;
  className?: string;
}


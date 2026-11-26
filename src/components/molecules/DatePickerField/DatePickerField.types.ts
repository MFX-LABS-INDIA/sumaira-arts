export interface DatePickerFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

import { buttonClass } from "@/components/atoms/Link";
import type { ButtonProps } from "./Button.types";

export function Button({ type = "button", className, ...props }: ButtonProps) {
  return <button type={type} className={buttonClass({ className })} {...props} />;
}

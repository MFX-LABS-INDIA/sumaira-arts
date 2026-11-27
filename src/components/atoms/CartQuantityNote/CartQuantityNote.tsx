import type { CartQuantityNoteProps } from "./CartQuantityNote.types";

export function CartQuantityNote({ quantity }: CartQuantityNoteProps) {
  if (quantity < 1) return null;

  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-emerald-50 py-0.5 pe-2 ps-0.5 align-middle text-xs font-medium leading-tight text-emerald-900">
      <span className="min-w-5 shrink-0 rounded-full bg-emerald-800 px-1 text-center font-semibold leading-5 text-white tabular-nums">
        {quantity}
      </span>{" "}
      <span>In your cart</span>
    </span>
  );
}

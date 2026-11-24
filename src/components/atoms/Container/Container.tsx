import type { ReactNode } from "react";

export const containerClassName = "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12";

/** Content column: 1280px max, with the site's standard side gutters. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${containerClassName} ${className}`}>{children}</div>
  );
}

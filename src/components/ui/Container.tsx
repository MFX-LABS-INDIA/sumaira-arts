import type { ReactNode } from "react";

/** Content column: 1280px max, with the site's standard side gutters. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}

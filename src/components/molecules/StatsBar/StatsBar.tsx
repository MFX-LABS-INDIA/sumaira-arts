import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export interface StatHighlightItem {
  value: string;
  label: string;
  icon: ReactNode;
  href?: string;
}

/** Compact 4-up editorial highlight cards with inline brand icon badges. */
export function StatsBar({
  items,
  className = "",
}: {
  items: readonly StatHighlightItem[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3.5 ${className}`}
    >
      {items.map((item) => {
        const inner = (
          <>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-light/80 bg-ice text-brand transition-colors group-hover:border-brand/30 group-hover:bg-brand group-hover:text-white sm:h-10 sm:w-10"
            >
              {item.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1">
                <span className="truncate font-serif text-sm font-medium tracking-tight text-deep sm:text-base lg:text-lg">
                  {item.value}
                </span>
                {item.href && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-brand transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                )}
              </span>
              <span className="mt-0.5 block truncate text-[10px] font-medium uppercase tracking-wider text-steel sm:text-[11px]">
                {item.label}
              </span>
            </span>
          </>
        );

        const cardClasses =
          "group flex items-center gap-2.5 rounded-xl border border-light bg-white/95 px-3 py-2.5 transition-all duration-200 hover:border-brand/35 hover:bg-white sm:gap-3.5 sm:px-4 sm:py-3.5";

        if (item.href) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClasses}
            >
              {inner}
            </a>
          );
        }

        return (
          <div key={item.label} className={cardClasses}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

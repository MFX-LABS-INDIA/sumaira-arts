import { SmartLink } from "@/components/atoms/Link";
import { Container } from "@/components/atoms/Container";
import { ArrowRight, Sparkles } from "lucide-react";

export function AboutMobileStickyBar() {
  return (
    <div
      aria-label="Quick action"
      className="fixed inset-x-0 bottom-0 z-40 block border-t border-light bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_28px_-14px_rgba(13,24,42,0.22)] backdrop-blur-md transition-all duration-300 ease-out-soft sm:hidden"
    >
      <Container className="flex items-center justify-between gap-3 py-2.5">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
              aria-hidden="true"
            />
            <p className="truncate text-xs font-semibold text-deep">
              Original Artworks
            </p>
          </div>
          <p className="truncate text-[11px] text-steel">
            Curated contemporary calligraphy
          </p>
        </div>

        <SmartLink
          href="/products"
          className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control bg-brand px-4 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:opacity-90"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>View Available Works</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </SmartLink>
      </Container>
    </div>
  );
}

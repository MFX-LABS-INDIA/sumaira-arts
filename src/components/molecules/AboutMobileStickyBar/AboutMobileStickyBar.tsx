import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { InstagramIcon } from "@/components/atoms/Icons";
import { site } from "@/constants/site";
import { ArrowRight, MessageSquare } from "lucide-react";

export function AboutMobileStickyBar() {
  return (
    <div
      aria-label="Quick action"
      className="fixed inset-x-0 bottom-0 z-40 block border-t border-light bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_28px_-14px_rgba(13,24,42,0.22)] backdrop-blur-md transition-all duration-300 ease-out-soft"
    >
      <Container className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
        {/* Left: Sumaira Arts Main Instagram Profile */}
        <a
          href={site.instagram.main}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Sumaira Arts Instagram profile"
          className="group flex h-11 items-center gap-2 rounded-control border border-light bg-ice/60 px-3.5 transition-all duration-200 hover:border-brand/40 hover:bg-white hover:shadow-xs sm:px-4"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-xs transition-transform duration-300 group-hover:scale-105">
            <InstagramIcon className="h-3.5 w-3.5" />
          </span>
          <span className="text-[11px] font-semibold text-deep transition-colors group-hover:text-brand sm:text-xs">
            @sumaira_arts
          </span>
        </a>

        {/* Right: Contact Us Button for Leads */}
        <Link
          href="/#contact"
          className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control bg-brand px-4 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:gap-2 sm:px-6 sm:text-xs sm:tracking-caps"
        >
          <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Contact Us</span>
          <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 sm:inline-block" aria-hidden="true" />
        </Link>
      </Container>
    </div>
  );
}

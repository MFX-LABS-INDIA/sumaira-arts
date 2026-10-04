import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon } from "./Icons";

type Tone = "light" | "dark";

/**
 * Same-page anchors stay plain <a> so Lenis can glide to them;
 * everything else goes through next/link for client-side navigation.
 */
export function SmartLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  return href.startsWith("#") ? <a href={href} {...props} /> : <NextLink href={href} {...props} />;
}

const buttonBase =
  "inline-flex items-center justify-center rounded-control border px-8 py-4 text-label font-medium uppercase tracking-caps transition-colors duration-300";

const buttonStyles = {
  solid: {
    light: "border-brand bg-brand text-white hover:border-deep hover:bg-deep",
    dark: "border-soft/40 bg-brand text-white hover:border-soft hover:bg-deep",
  },
  /** A white button for photographs and dark surfaces. */
  inverse: {
    light: "border-white bg-white text-deep hover:border-soft hover:bg-soft",
    dark: "border-white bg-white text-deep hover:border-soft hover:bg-soft",
  },
  outline: {
    light: "border-steel/50 text-steel hover:border-brand hover:bg-brand hover:text-white",
    dark: "border-white/50 text-white hover:border-white hover:bg-white hover:text-deep",
  },
} as const;

type ButtonOptions = { variant?: keyof typeof buttonStyles; tone?: Tone; className?: string };

/** Class string for anything that should look like a button (links, submit buttons). */
export const buttonClass = ({ variant = "solid", tone = "light", className = "" }: ButtonOptions = {}) =>
  `${buttonBase} ${buttonStyles[variant][tone]} ${className}`;

export function ButtonLink({ href, children, ...options }: ButtonOptions & { href: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className={buttonClass(options)}>
      {children}
    </SmartLink>
  );
}

/** Quiet editorial link: small caps, hairline underline, arrow that nudges on hover. */
export function TextLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const color = tone === "dark" ? "text-soft" : "text-brand";
  return (
    <SmartLink
      href={href}
      className={`group/link inline-flex items-center gap-3 border-b border-current/30 pb-1.5 text-label font-medium uppercase tracking-caps transition-colors duration-300 hover:border-current ${color} ${className}`}
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1" />
    </SmartLink>
  );
}

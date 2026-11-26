import type { ComponentProps, ReactNode } from "react";

export type LinkTone = "light" | "dark";
export type SmartLinkProps = ComponentProps<"a"> & { href: string };
export type ButtonLinkOptions = { variant?: "solid" | "inverse" | "outline"; tone?: LinkTone; className?: string };
export type ButtonLinkProps = ButtonLinkOptions & { href: string; children: ReactNode };
export type TextLinkProps = { href: string; children: ReactNode; tone?: LinkTone; className?: string };

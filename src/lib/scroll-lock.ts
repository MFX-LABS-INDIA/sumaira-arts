"use client";

import { useEffect } from "react";

interface LenisLike {
  stop?: () => void;
  start?: () => void;
}

interface SavedScrollState {
  scrollY: number;
  fixedApplied: boolean;
  htmlOverflow: string;
  htmlOverscroll: string;
  bodyOverflow: string;
  bodyOverscroll: string;
  bodyPaddingRight: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
}

let lockCount = 0;
let savedState: SavedScrollState | null = null;

function getLenis(): LenisLike | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

function acquireScrollLock(): void {
  lockCount += 1;
  if (lockCount > 1 || typeof document === "undefined") return;

  const html = document.documentElement;
  const body = document.body;
  const lenis = getLenis();
  const scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - html.clientWidth;
  const fixedApplied = !lenis;

  savedState = {
    scrollY,
    fixedApplied,
    htmlOverflow: html.style.overflow,
    htmlOverscroll: html.style.overscrollBehavior,
    bodyOverflow: body.style.overflow,
    bodyOverscroll: body.style.overscrollBehavior,
    bodyPaddingRight: body.style.paddingRight,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
  };

  lenis?.stop?.();

  html.style.overflow = "hidden";
  html.style.overscrollBehavior = "none";
  body.style.overflow = "hidden";
  body.style.overscrollBehavior = "none";

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  if (fixedApplied) {
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  }
}

function releaseScrollLock(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0 || !savedState || typeof document === "undefined") return;

  const state = savedState;
  savedState = null;

  const html = document.documentElement;
  const body = document.body;
  const lenis = getLenis();

  html.style.overflow = state.htmlOverflow;
  html.style.overscrollBehavior = state.htmlOverscroll;
  body.style.overflow = state.bodyOverflow;
  body.style.overscrollBehavior = state.bodyOverscroll;
  body.style.paddingRight = state.bodyPaddingRight;
  body.style.position = state.bodyPosition;
  body.style.top = state.bodyTop;
  body.style.left = state.bodyLeft;
  body.style.right = state.bodyRight;
  body.style.width = state.bodyWidth;

  if (state.fixedApplied) {
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, state.scrollY);
    html.style.scrollBehavior = prevScrollBehavior;
  }

  lenis?.start?.();
}

export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;
    acquireScrollLock();
    return () => releaseScrollLock();
  }, [isLocked]);
}

"use client";

import { useSyncExternalStore, ViewTransition } from "react";

// iOS WebKit snapshots a named element at its full size, not just the part in
// the viewport. Our wrapper holds the whole page plus the footer, so on a phone
// that is a texture tens of thousands of pixels tall at 3x density, and the tab
// runs out of memory and reloads. `-webkit-touch-callout` only exists in iOS
// WebKit, which every iOS browser uses.
const isIOSWebKit = () => typeof CSS !== "undefined" && CSS.supports("-webkit-touch-callout", "none");
const subscribe = () => () => {};

/**
 * On iOS the page keeps an unnamed boundary: React still runs the navigation
 * inside a view transition, but only the viewport-sized root and the header
 * get captured.
 */
export function SheetTransition({ children }: { children: React.ReactNode }) {
  const lite = useSyncExternalStore(subscribe, isIOSWebKit, () => false);
  return (
    <ViewTransition enter={lite ? "none" : "page-enter"} exit={lite ? "none" : "page-exit"} default="none">
      {children}
    </ViewTransition>
  );
}

import React from "react";

import NotFoundErrorPage from "./not-found";
import SessionExpiredErrorPage from "./session-expired";
import LoadFailedErrorPage from "./load-failed";
import InvalidBrowserErrorPage from "./invalid-browser";
import InvalidResetLinkErrorPage from "./invalid-reset-link";
import CrashErrorPage from "./crash";

export interface ErrorPageDef {
  /** Stable id used as the URL hash, e.g. `error-page-404`. */
  id: string;
  /** Sidebar / overview label. */
  title: string;
  /** Short description shown on the overview card. */
  description: string;
  /** Optional status code shown as a badge on the overview card. */
  status?: string;
  /** Path to the source file in the repo (shown on the overview). */
  source: string;
  /** Live preview component. */
  component: React.ComponentType;
}

export const ERROR_PAGES: ErrorPageDef[] = [
  {
    id: "error-page-404",
    title: "404 — Not Found",
    description:
      "The page or record the user navigated to doesn't exist. Offers a way back to the dashboard or search.",
    status: "404",
    source: "src/components/error-pages/not-found.tsx",
    component: NotFoundErrorPage,
  },
  {
    id: "error-page-session-expired",
    title: "Session Expired",
    description:
      "Auto sign-out after inactivity on a shared workstation. Reassures the user that data is safe and offers to sign in again.",
    status: "401",
    source: "src/components/error-pages/session-expired.tsx",
    component: SessionExpiredErrorPage,
  },
  {
    id: "error-page-load-failed",
    title: "Couldn't Load the Page",
    description:
      "Network or server reach failure. Shows a request ID for support and a clear retry path.",
    status: "503",
    source: "src/components/error-pages/load-failed.tsx",
    component: LoadFailedErrorPage,
  },
  {
    id: "error-page-invalid-browser",
    title: "Unsupported Browser",
    description:
      "The user is on an outdated or incompatible browser. Lists supported browsers and a download link.",
    source: "src/components/error-pages/invalid-browser.tsx",
    component: InvalidBrowserErrorPage,
  },
  {
    id: "error-page-invalid-reset-link",
    title: "Invalid Password Reset Link",
    description:
      "The reset link is expired or already used. Lets the user request a fresh link.",
    status: "410",
    source: "src/components/error-pages/invalid-reset-link.tsx",
    component: InvalidResetLinkErrorPage,
  },
  {
    id: "error-page-crash",
    title: "App Crash",
    description:
      "Top-level error boundary fallback for unhandled exceptions. Surfaces a trace ID for support.",
    status: "500",
    source: "src/components/error-pages/crash.tsx",
    component: CrashErrorPage,
  },
];

export const ERROR_PAGE_IDS = ERROR_PAGES.map((p) => p.id);

export function getErrorPageById(id: string): ErrorPageDef | undefined {
  return ERROR_PAGES.find((p) => p.id === id);
}

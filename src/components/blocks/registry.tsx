import React from "react";
import { AppSidebarDemo } from "@/lib/registry/sidebar-01-demo";
import { InnerPageLayoutDemo } from "@/lib/registry/sidebar-inner-page-01-demo";
import { InnerPageLayout02Demo } from "@/lib/registry/sidebar-inner-page-02-demo";
import { SIDEBAR_01_CODE } from "./sidebar-01";
import { INNER_PAGE_01_CODE } from "./inner-page-01";
import { INNER_PAGE_02_CODE } from "./inner-page-02";

export type BlockCategory = "All" | "Sidebar" | "Authentication" | "Dashboard";

export interface BlockDef {
  id: string;
  name: string;
  description: string;
  category: Exclude<BlockCategory, "All">;
  preview: (fullPage?: boolean) => React.ReactNode;
  scale?: number;
  code: string;
}

export const BLOCKS: BlockDef[] = [
  {
    id: "sidebar-01",
    name: "Main Dashboard",
    description: "A dashboard with collapsible sidebar navigation and team switcher.",
    category: "Sidebar",
    preview: (fullPage) => <AppSidebarDemo fullPage={fullPage} />,
    scale: 0.68,
    code: SIDEBAR_01_CODE,
  },
  {
    id: "inner-page-01",
    name: "Inner Page",
    description: "An inner-page patient detail layout with a fixed sidebar and contextual breadcrumb header.",
    category: "Sidebar",
    preview: (fullPage) => <InnerPageLayoutDemo fullPage={fullPage} />,
    scale: 0.68,
    code: INNER_PAGE_01_CODE,
  },
  {
    id: "inner-page-02",
    name: "Inner Page with Patient Detail",
    description: "A patient detail page with a sidebar, stats cards, tab navigation, and condition tags.",
    category: "Sidebar",
    preview: (fullPage) => <InnerPageLayout02Demo fullPage={fullPage} />,
    scale: 0.68,
    code: INNER_PAGE_02_CODE,
  },
];

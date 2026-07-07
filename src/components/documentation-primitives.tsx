import * as React from "react";
import {
  EyebrowTitle,
  Lead,
  PageTitle,
  SectionTitle,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type DocumentationPageProps = {
  children: React.ReactNode;
  className?: string;
  maxWidthClassName?: string;
};

export function DocumentationPage({
  children,
  className,
  maxWidthClassName = "max-w-4xl",
}: DocumentationPageProps) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div
        className={cn(
          "mx-auto space-y-16 p-4 md:p-8",
          maxWidthClassName,
          className
        )}
      >
        {children}
      </div>
    </main>
  );
}

type DocumentationHeaderProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  leadClassName?: string;
};

export function DocumentationHeader({
  title,
  children,
  leadClassName,
}: DocumentationHeaderProps) {
  return (
    <header>
      <EyebrowTitle className="text-muted-foreground text-xs tracking-widest uppercase">
        Documentation
      </EyebrowTitle>
      <PageTitle className="mt-3 scroll-m-20">{title}</PageTitle>
      <Lead className={cn("mt-6 max-w-2xl text-xl", leadClassName)}>
        {children}
      </Lead>
    </header>
  );
}

type DocumentationSectionHeadingProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export function DocumentationSectionHeading({
  id,
  children,
  className,
}: DocumentationSectionHeadingProps) {
  return (
    <SectionTitle id={id} className={cn("scroll-m-20", className)}>
      {children}
    </SectionTitle>
  );
}

export function DocumentationInlineCode({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <code className="bg-muted text-foreground relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

type DocumentationParagraphProps = React.ComponentPropsWithoutRef<"p"> & {
  spacing?: "none" | "section" | "subsection" | "stack";
  tone?: "default" | "muted";
};

export function DocumentationParagraph({
  className,
  spacing = "subsection",
  tone = "default",
  ...props
}: DocumentationParagraphProps) {
  const spacingClassName =
    spacing === "none"
      ? ""
      : spacing === "subsection"
        ? "mt-3"
        : spacing === "stack"
          ? "not-first:mt-3"
          : "mt-6";

  return (
    <p
      className={cn(
        tone === "muted" ? "text-muted-foreground" : "text-foreground",
        "leading-7",
        spacingClassName,
        className
      )}
      {...props}
    />
  );
}

export const documentationLinkClassName =
  "text-primary underline-offset-4 hover:underline";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DocumentationHeader,
  DocumentationPage,
  DocumentationParagraph,
  DocumentationSectionHeading as SectionHeading,
} from "@/components/documentation-primitives";

type AssetPreview = {
  title: string;
  src: string;
  alt: string;
  theme: "light" | "dark";
  width: number;
  height: number;
};

type BrandSection = {
  id: string;
  name: string;
  summary: string;
  downloadHref: string;
  folderLabel: string;
  featuredPreviews: [AssetPreview, AssetPreview];
};

function getDownloadFileName(folderLabel: string) {
  const folderName =
    folderLabel.split("/").filter(Boolean).pop() ?? "brand-assets";
  return `${folderName}.zip`;
}

const BRANDS: BrandSection[] = [
  {
    id: "care",
    name: "Care",
    summary:
      "Approved Care identity assets for product UI, documentation, announcements, and partner materials.",
    downloadHref: "/brand-assets/downloads/Care-Logos.zip",
    folderLabel: "public/brand-assets/uploads/Care-Logos",
    featuredPreviews: [
      {
        title: "Logotype on light",
        src: "/brand-assets/uploads/Care-Logos/SVG/Care-logotype-on-light.svg",
        alt: "Care logotype on a light background",
        theme: "light",
        width: 560,
        height: 140,
      },
      {
        title: "Logotype on dark",
        src: "/brand-assets/uploads/Care-Logos/SVG/Care-logotype-color-icon-on-dark.svg",
        alt: "Care logotype on a dark background",
        theme: "dark",
        width: 560,
        height: 140,
      },
    ],
  },
  {
    id: "ohcnf",
    name: "OHCNF",
    summary:
      "Official OHCNF logo assets for foundation communications, campaign pages, sponsorship collateral, and external use.",
    downloadHref: "/brand-assets/downloads/OHCNF-Logo.zip",
    folderLabel: "public/brand-assets/uploads/OHCNF-Logo",
    featuredPreviews: [
      {
        title: "Logotype on light",
        src: "/brand-assets/uploads/OHCNF-Logo/SVG/OHCNF-logotype-on-light.svg",
        alt: "OHCNF logotype on a light background",
        theme: "light",
        width: 620,
        height: 140,
      },
      {
        title: "Logotype on dark",
        src: "/brand-assets/uploads/OHCNF-Logo/SVG/OHCNF-logotype-color-icon-on-dark.svg",
        alt: "OHCNF logotype on a dark background",
        theme: "dark",
        width: 620,
        height: 140,
      },
    ],
  },
  {
    id: "ohc",
    name: "OHC",
    summary:
      "Official OHC lockups for platform surfaces, press usage, and collaboration assets across light and dark contexts.",
    downloadHref: "/brand-assets/downloads/OHC-Logo.zip",
    folderLabel: "public/brand-assets/uploads/OHC-Logo",
    featuredPreviews: [
      {
        title: "Logotype on light",
        src: "/brand-assets/uploads/OHC-Logo/SVG/OHC-logotype-on-light-flat-color.svg",
        alt: "OHC logotype on a light background",
        theme: "light",
        width: 620,
        height: 140,
      },
      {
        title: "Logotype on dark",
        src: "/brand-assets/uploads/OHC-Logo/SVG/OHC-logotype-color-icon-on-dark.svg",
        alt: "OHC logotype on a dark background",
        theme: "dark",
        width: 620,
        height: 140,
      },
    ],
  },
];

function BrandPreviewCard({ preview }: { preview: AssetPreview }) {
  const surfaceClassName =
    preview.theme === "dark"
      ? "bg-neutral-950 border-white/10"
      : "bg-white border-neutral-200";

  return (
    <article className="border-border bg-card overflow-hidden rounded-xl border">
      <div
        className={`${surfaceClassName} flex min-h-48 items-center justify-center border-b p-5 md:p-6`}
      >
        <div className="flex h-20 w-full max-w-[15rem] items-center justify-center md:h-24 md:max-w-[17rem]">
          <img
            src={preview.src}
            alt={preview.alt}
            width={preview.width}
            height={preview.height}
            loading="lazy"
            decoding="async"
            className="max-h-full w-auto max-w-full object-contain"
          />
        </div>
      </div>
      <div className="space-y-1 p-4">
        <h3 className="text-foreground text-sm font-semibold">
          {preview.title}
        </h3>
        <p className="text-muted-foreground text-xs">
          Use this approved variant on {preview.theme} backgrounds.
        </p>
      </div>
    </article>
  );
}

function BrandSectionBlock({ brand }: { brand: BrandSection }) {
  return (
    <section id={brand.id} className="space-y-6">
      <div className="space-y-2 border-b pb-2">
        <div className="max-w-2xl space-y-2">
          <SectionHeading id={`${brand.id}-heading`}>
            {brand.name}
          </SectionHeading>
          <DocumentationParagraph
            spacing="none"
            tone="muted"
            className="text-sm leading-6"
          >
            {brand.summary}
          </DocumentationParagraph>
        </div>
      </div>
      <div className="space-y-1 md:space-y-4">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4">
          {brand.featuredPreviews.map((preview) => (
            <BrandPreviewCard key={preview.src} preview={preview} />
          ))}
        </div>
        <div className="bg-soft-background border-border flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <p className="text-muted-foreground max-w-2xl text-sm leading-6">
            Download a ZIP with approved {brand.name} logo assets in SVG and PNG
            formats, including light and dark variants for different
            backgrounds.
          </p>
          <Button asChild className="w-full shrink-0 sm:w-auto">
            <a
              href={brand.downloadHref}
              download={getDownloadFileName(brand.folderLabel)}
            >
              <Download className="h-4 w-4" />
              Download Assets
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ClearspaceGuidance() {
  const guideBoxes = [
    {
      key: "icon-clearspace-01",
      title: "OHC Icon Clearspace Guide",
      variant: "01",
      description:
        "Primary clearspace example for the icon. Keep a minimum offset of 1x from nearby elements.",
      src: "/brand-assets/Clearspace-guide/OHC-icon-clearspace-guide_01.svg",
      alt: "OHC icon clearspace guide 01",
    },
    {
      key: "icon-clearspace-02",
      title: "OHC Icon Clearspace Guide",
      variant: "02",
      description:
        "Secondary icon clearspace example using the same 1x spacing rule for surrounding content.",
      src: "/brand-assets/Clearspace-guide/OHC-icon-clearspace-guide_02.svg",
      alt: "OHC icon clearspace guide 02",
    },
    {
      key: "icon-safety-01",
      title: "OHC Icon Safety Area",
      variant: "01",
      description:
        "Icon safety area reference. The protected zone scales from the symbol height so the mark remains legible.",
      src: "/brand-assets/Clearspace-guide/OHC-icon-safety-area_01.svg",
      alt: "OHC icon safety area guide 01",
    },
    {
      key: "icon-safety-02",
      title: "OHC Icon Safety Area",
      variant: "02",
      description:
        "Alternate icon safety-area construction for tighter layouts while preserving the same protected zone logic.",
      src: "/brand-assets/Clearspace-guide/OHC-icon-safety-area_02.svg",
      alt: "OHC icon safety area guide 02",
    },
    {
      key: "logotype-safety-01",
      title: "OHC Logotype Safety Area",
      variant: "01",
      description:
        "Primary logotype safety-area reference. The surrounding clearspace is derived from the symbol height.",
      src: "/brand-assets/Clearspace-guide/OHC-logotype-safety-area_01.svg",
      alt: "OHC logotype safety area guide 01",
    },
    {
      key: "logotype-safety-02",
      title: "OHC Logotype Safety Area",
      variant: "02",
      description:
        "Alternate logotype safety-area reference using the same symbol-height-based spacing system.",
      src: "/brand-assets/Clearspace-guide/OHC-logotype-safety-area_02.svg",
      alt: "OHC logotype safety area guide 02",
    },
  ] as const;

  return (
    <section id="spacing-considerations" className="space-y-6">
      <SectionHeading id="spacing-considerations-heading">
        Clearspace Guidance
      </SectionHeading>
      <DocumentationParagraph spacing="none" tone="muted" className="max-w-3xl">
        Keep consistent clearspace around each primary logo so the mark remains
        readable and visually distinct. Avoid placing text, imagery, UI
        elements, or other logos inside the protected area.
      </DocumentationParagraph>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {guideBoxes.map((guide) => {
          const isClearspaceIconGuide =
            guide.key.startsWith("icon-clearspace-");
          const isLogotypeSafetyGuide =
            guide.key.startsWith("logotype-safety-");

          return (
            <article
              key={guide.key}
              className="border-border bg-card overflow-hidden rounded-xl border"
            >
              <div
                className={`border-b bg-white ${isClearspaceIconGuide ? "p-3 md:p-4" : isLogotypeSafetyGuide ? "p-2 md:p-3" : "p-5 md:p-6"}`}
              >
                <div
                  className={`mx-auto ${isClearspaceIconGuide ? "border-border w-fit rounded-md border border-solid" : isLogotypeSafetyGuide ? "w-full" : "w-fit"}`}
                >
                  <img
                    src={guide.src}
                    alt={guide.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className={`mx-auto h-auto w-full object-contain ${isClearspaceIconGuide ? "max-w-[120px]" : isLogotypeSafetyGuide ? "max-w-full" : "max-w-xl"}`}
                  />
                </div>
              </div>
              <div className="space-y-1 p-4">
                <h3 className="text-foreground text-sm font-semibold">
                  {guide.title} ({guide.variant})
                </h3>
                <p className="text-muted-foreground text-xs">
                  {guide.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function BrandsPage() {
  return (
    <DocumentationPage>
      <DocumentationHeader title="Brands" leadClassName="max-w-3xl text-xl">
        Centralised brand assets for Care, OHCNF, and OHC. Each section includes
        download-ready files, approved light and dark variants, and spacing
        references for correct logo placement.
      </DocumentationHeader>

      {BRANDS.map((brand) => (
        <BrandSectionBlock key={brand.id} brand={brand} />
      ))}

      <ClearspaceGuidance />
    </DocumentationPage>
  );
}

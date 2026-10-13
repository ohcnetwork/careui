import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { DentalChartTemplate } from "@/components/templates/dental-chart";

export const dentalChartDoc: ComponentDoc = {
  id: "dental-chart",
  name: "Dental Chart",
  description:
    "A full-page odontogram for charting tooth and surface findings, comparing visits, and documenting treatment plans.",
  installation: {
    cli: "",
    manual:
      "Use the Dental Chart template in this repository. Its framework-free model and generated geometry live in src/lib/dental-chart/.",
  },
  usage: `import { DentalChartTemplate } from "@/components/templates/dental-chart"\n\n<DentalChartTemplate />`,
  preview: {
    code: `import { DentalChartTemplate } from "@/components/templates/dental-chart"\n\n<DentalChartTemplate />`,
    component: React.createElement(DentalChartTemplate),
  },
  props: [],
};

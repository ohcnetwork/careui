import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { ScribeIntro } from "@/components/ui/scribe-intro";

export const scribeIntroDoc: ComponentDoc = {
  id: "scribe-intro",
  name: "Scribe Intro",
  description:
    "A compact first-run card that introduces the scribe, with a primary action and a dismiss control.",
  installation: {
    cli: "npx shadcn@latest add scribe-intro",
    manual:
      "Copy and paste the scribe-intro component source code into your project. It depends on the button component.",
  },
  usage: `import { ScribeIntro } from "@/components/ui/scribe-intro"

<ScribeIntro onTry={start} onDismiss={close} />`,
  preview: {
    code: `<ScribeIntro onTry={() => {}} onDismiss={() => {}} />`,
    component: React.createElement(ScribeIntro, {
      onTry: () => {},
      onDismiss: () => {},
    }),
  },
  examples: [
    {
      name: "Custom copy",
      description: "Replace the title, description and button labels.",
      code: `<ScribeIntro
  title="Dictate your notes"
  description="Speak naturally and review the draft before saving."
  tryLabel="Start"
  laterLabel="Not now"
/>`,
      preview: React.createElement(ScribeIntro, {
        title: "Dictate your notes",
        description: "Speak naturally and review the draft before saving.",
        tryLabel: "Start",
        laterLabel: "Not now",
      }),
    },
  ],
  props: [
    {
      name: "title",
      type: "ReactNode",
      default: '"Meet Scribe"',
      description: "Card heading.",
    },
    { name: "description", type: "ReactNode", description: "Supporting text." },
    {
      name: "tryLabel",
      type: "string",
      default: '"Try it"',
      description: "Primary button label.",
    },
    {
      name: "laterLabel",
      type: "string",
      default: '"Later"',
      description: "Secondary button label.",
    },
    {
      name: "dismissLabel",
      type: "string",
      default: '"Dismiss"',
      description: "Accessible label for the close button.",
    },
    {
      name: "onTry",
      type: "() => void",
      description: "Called when the primary button is clicked.",
    },
    {
      name: "onDismiss",
      type: "() => void",
      description: "Called by the close and secondary buttons.",
    },
  ],
};

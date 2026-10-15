import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { VoiceWaveform } from "@/components/ui/voice-waveform";

function LiveDemo() {
  const [levels, setLevels] = React.useState<number[]>(() =>
    Array(9).fill(0.3)
  );
  React.useEffect(() => {
    const id = window.setInterval(
      () => setLevels(Array.from({ length: 9 }, () => Math.random())),
      120
    );
    return () => window.clearInterval(id);
  }, []);
  return React.createElement(VoiceWaveform, { levels });
}

export const voiceWaveformDoc: ComponentDoc = {
  id: "voice-waveform",
  name: "Voice Waveform",
  description:
    "An animated equalizer that signals active listening or recording. It loops on its own, or follows live audio levels.",
  installation: {
    cli: "npx shadcn@latest add voice-waveform",
    manual:
      "Copy and paste the voice-waveform component source code into your project. Its keyframes are bundled with the component.",
  },
  usage: `import { VoiceWaveform } from "@/components/ui/voice-waveform"

<VoiceWaveform />`,
  preview: {
    code: `<VoiceWaveform />`,
    component: React.createElement(VoiceWaveform),
  },
  examples: [
    {
      name: "Bar count",
      description: "Change the number of bars.",
      code: `<VoiceWaveform bars={5} />`,
      preview: React.createElement(VoiceWaveform, { bars: 5 }),
    },
    {
      name: "Colour",
      description: "Bars use `currentColor`, so any text colour utility works.",
      code: `<VoiceWaveform className="text-primary" />`,
      preview: React.createElement(VoiceWaveform, {
        className: "text-primary",
      }),
    },
    {
      name: "Live levels",
      description:
        "Pass levels from 0 to 1, one per bar, to follow microphone input.",
      code: `<VoiceWaveform levels={levels} />`,
      preview: React.createElement(LiveDemo),
    },
  ],
  props: [
    {
      name: "bars",
      type: "number",
      default: "9",
      description: "Number of bars.",
    },
    {
      name: "levels",
      type: "number[]",
      description:
        "Live levels (0–1), one per bar. When set, the CSS loop is replaced.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
};

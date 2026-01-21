import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export const inputOtpDoc: ComponentDoc = {
  id: "input-otp",
  name: "Input OTP",
  description:
    "Accessible one-time password component with copy paste functionality.",
  installation: {
    cli: "npx shadcn@latest add input-otp",
    manual:
      "Install input-otp dependency and copy the input-otp component source code into your project.",
  },
  usage: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  preview: {
    code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    component: React.createElement(
      InputOTP as any,
      { maxLength: 6 },
      React.createElement(
        InputOTPGroup,
        {},
        React.createElement(InputOTPSlot, { index: 0 }),
        React.createElement(InputOTPSlot, { index: 1 }),
        React.createElement(InputOTPSlot, { index: 2 })
      ),
      React.createElement(InputOTPSeparator, {}),
      React.createElement(
        InputOTPGroup,
        {},
        React.createElement(InputOTPSlot, { index: 3 }),
        React.createElement(InputOTPSlot, { index: 4 }),
        React.createElement(InputOTPSlot, { index: 5 })
      )
    ),
  },
  examples: [
    {
      name: "Pattern",
      description: "OTP input with numeric pattern validation.",
      code: `<InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
      preview: React.createElement(
        InputOTP as any,
        { maxLength: 4 },
        React.createElement(
          InputOTPGroup,
          {},
          React.createElement(InputOTPSlot, { index: 0 }),
          React.createElement(InputOTPSlot, { index: 1 }),
          React.createElement(InputOTPSlot, { index: 2 }),
          React.createElement(InputOTPSlot, { index: 3 })
        )
      ),
    },
    {
      name: "Controlled",
      description: "OTP input with state control.",
      code: `function Example() {
  const [value, setValue] = React.useState("")

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "space-y-2" },
        React.createElement(
          InputOTP as any,
          { maxLength: 6 },
          React.createElement(
            InputOTPGroup,
            {},
            React.createElement(InputOTPSlot, { index: 0 }),
            React.createElement(InputOTPSlot, { index: 1 }),
            React.createElement(InputOTPSlot, { index: 2 }),
            React.createElement(InputOTPSlot, { index: 3 }),
            React.createElement(InputOTPSlot, { index: 4 }),
            React.createElement(InputOTPSlot, { index: 5 })
          )
        ),
        React.createElement(
          "div",
          { className: "text-center text-sm" },
          "Enter your one-time password."
        )
      ),
    },
  ],
  props: [
    {
      name: "maxLength",
      type: "number",
      description: "Maximum number of characters.",
      default: "6",
    },
    {
      name: "value",
      type: "string",
      description: "The controlled value of the OTP input.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Event handler called when the value changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the OTP input is disabled.",
      default: "false",
    },
    {
      name: "pattern",
      type: "RegExp",
      description: "Pattern to validate each character.",
    },
  ],
};

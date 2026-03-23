import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { RefreshCwIcon } from "lucide-react";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

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
  InputOTPSeparator,
  InputOTPSlot,
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
    code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6} defaultValue="123456">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`,
    component: React.createElement(
      InputOTP as any,
      { maxLength: 6, defaultValue: "123456" },
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
  },
  examples: [
    {
      name: "Pattern",
      description: "Use the pattern prop to define a custom pattern for the OTP input.",
      code: `import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

export function InputOTPPattern() {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel>
      <InputOTP id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        { className: "w-fit" },
        React.createElement(FieldLabel, { htmlFor: "digits-only" }, "Digits Only"),
        React.createElement(
          InputOTP as any,
          { id: "digits-only", maxLength: 6, pattern: REGEXP_ONLY_DIGITS },
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
        )
      ),
    },
    {
      name: "Separator",
      description: "Use the InputOTPSeparator component to add a separator between input groups.",
      code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPWithSeparator() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`,
      preview: React.createElement(
        InputOTP as any,
        { maxLength: 6 },
        React.createElement(
          InputOTPGroup,
          {},
          React.createElement(InputOTPSlot, { index: 0 }),
          React.createElement(InputOTPSlot, { index: 1 })
        ),
        React.createElement(InputOTPSeparator, {}),
        React.createElement(
          InputOTPGroup,
          {},
          React.createElement(InputOTPSlot, { index: 2 }),
          React.createElement(InputOTPSlot, { index: 3 })
        ),
        React.createElement(InputOTPSeparator, {}),
        React.createElement(
          InputOTPGroup,
          {},
          React.createElement(InputOTPSlot, { index: 4 }),
          React.createElement(InputOTPSlot, { index: 5 })
        )
      ),
    },
    {
      name: "Disabled",
      description: "Use the disabled prop to disable the input.",
      code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDisabled() {
  return (
    <InputOTP id="disabled" maxLength={6} disabled value="123456">
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
    </InputOTP>
  )
}`,
      preview: React.createElement(
        InputOTP as any,
        { maxLength: 6, disabled: true, value: "123456" },
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
    {
      name: "Controlled",
      description: "Use the value and onChange props to control the input value.",
      code: `"use client"

import * as React from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPControlled() {
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
      preview: React.createElement(function InputOTPControlledPreview() {
        const [value, setValue] = React.useState("");
        return React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(
            InputOTP as any,
            { maxLength: 6, value, onChange: (v: string) => setValue(v) },
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
            value === ""
              ? "Enter your one-time password."
              : `You entered: ${value}`
          )
        );
      }),
    },
    {
      name: "Invalid",
      description: "Use aria-invalid on the slots to show an error state.",
      code: `"use client"

import * as React from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPInvalid() {
  const [value, setValue] = React.useState("000000")

  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} aria-invalid />
        <InputOTPSlot index={1} aria-invalid />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} aria-invalid />
        <InputOTPSlot index={3} aria-invalid />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} aria-invalid />
        <InputOTPSlot index={5} aria-invalid />
      </InputOTPGroup>
    </InputOTP>
  )
}`,
      preview: React.createElement(function InputOTPInvalidPreview() {
        const [value, setValue] = React.useState("000000");
        return React.createElement(
          InputOTP as any,
          { maxLength: 6, value, onChange: (v: string) => setValue(v) },
          React.createElement(
            InputOTPGroup,
            {},
            React.createElement(InputOTPSlot, { index: 0, "aria-invalid": true }),
            React.createElement(InputOTPSlot, { index: 1, "aria-invalid": true })
          ),
          React.createElement(InputOTPSeparator, {}),
          React.createElement(
            InputOTPGroup,
            {},
            React.createElement(InputOTPSlot, { index: 2, "aria-invalid": true }),
            React.createElement(InputOTPSlot, { index: 3, "aria-invalid": true })
          ),
          React.createElement(InputOTPSeparator, {}),
          React.createElement(
            InputOTPGroup,
            {},
            React.createElement(InputOTPSlot, { index: 4, "aria-invalid": true }),
            React.createElement(InputOTPSlot, { index: 5, "aria-invalid": true })
          )
        );
      }),
    },
    {
      name: "Four Digits",
      description: "A common pattern for PIN codes using REGEXP_ONLY_DIGITS.",
      code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

export function InputOTPFourDigits() {
  return (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  )
}`,
      preview: React.createElement(
        InputOTP as any,
        { maxLength: 4, pattern: REGEXP_ONLY_DIGITS },
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
      name: "Alphanumeric",
      description: "Use REGEXP_ONLY_DIGITS_AND_CHARS to accept both letters and numbers.",
      code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

export function InputOTPAlphanumeric() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
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
    </InputOTP>
  )
}`,
      preview: React.createElement(
        InputOTP as any,
        { maxLength: 6, pattern: REGEXP_ONLY_DIGITS_AND_CHARS },
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
    {
      name: "Form",
      description: "OTP input inside a verification card form.",
      code: `import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { RefreshCwIcon } from "lucide-react"

export function InputOTPForm() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">m@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button variant="outline" size="xs">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <InputOTP maxLength={6} id="otp-verification" required>
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            <a href="#">I no longer have access to this email address.</a>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" className="w-full">
            Verify
          </Button>
          <div className="text-sm text-muted-foreground">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}`,
      preview: React.createElement(
        Card,
        { className: "mx-auto max-w-md" },
        React.createElement(
          CardHeader,
          {},
          React.createElement(CardTitle, {}, "Verify your login"),
          React.createElement(
            CardDescription,
            {},
            "Enter the verification code we sent to your email address: ",
            React.createElement("span", { className: "font-medium" }, "m@example.com"),
            "."
          )
        ),
        React.createElement(
          CardContent,
          {},
          React.createElement(
            Field,
            {},
            React.createElement(
              "div",
              { className: "flex items-center justify-between" },
              React.createElement(FieldLabel, { htmlFor: "otp-verification" }, "Verification code"),
              React.createElement(
                Button,
                { variant: "tertiary", size: "xs" as any },
                React.createElement(RefreshCwIcon),
                "Resend Code"
              )
            ),
            React.createElement(
              InputOTP as any,
              { maxLength: 6, id: "otp-verification" },
              React.createElement(
                InputOTPGroup,
                { className: "*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl" },
                React.createElement(InputOTPSlot, { index: 0 }),
                React.createElement(InputOTPSlot, { index: 1 }),
                React.createElement(InputOTPSlot, { index: 2 })
              ),
              React.createElement(InputOTPSeparator, { className: "mx-2" }),
              React.createElement(
                InputOTPGroup,
                { className: "*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl" },
                React.createElement(InputOTPSlot, { index: 3 }),
                React.createElement(InputOTPSlot, { index: 4 }),
                React.createElement(InputOTPSlot, { index: 5 })
              )
            ),
            React.createElement(
              FieldDescription,
              {},
              React.createElement("a", { href: "#" }, "I no longer have access to this email address.")
            )
          )
        ),
        React.createElement(
          CardFooter,
          {},
          React.createElement(
            Field,
            {},
            React.createElement(Button, { type: "submit", className: "w-full" }, "Verify"),
            React.createElement(
              "div",
              { className: "text-sm text-muted-foreground" },
              "Having trouble signing in? ",
              React.createElement(
                "a",
                { href: "#", className: "underline underline-offset-4 transition-colors hover:text-primary" },
                "Contact support"
              )
            )
          )
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

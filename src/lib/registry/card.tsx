import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const cardDoc: ComponentDoc = {
  id: "card",
  name: "Card",
  description:
    "Displays a card with header, content, footer, and action components.",
  installation: {
    cli: "npx shadcn@latest add card",
    manual: "Copy and paste the card component source code into your project.",
  },
  usage: `import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}`,
  preview: {
    code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Login to your account</CardTitle>
    <CardDescription>
      Enter your email below to login to your account
    </CardDescription>
    <CardAction>
      <Button variant="link">Sign Up</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex-col gap-2">
    <Button type="submit" className="w-full">
      Login
    </Button>
    <Button variant="outline" className="w-full">
      Login with Google
    </Button>
  </CardFooter>
</Card>`,
    component: React.createElement(
      Card,
      { className: "w-full max-w-sm" },
      React.createElement(
        CardHeader,
        {},
        React.createElement(CardTitle, {}, "Login to your account"),
        React.createElement(
          CardDescription,
          {},
          "Enter your email below to login to your account"
        ),
        React.createElement(
          CardAction,
          {},
          React.createElement(Button, { variant: "link" }, "Sign Up")
        )
      ),
      React.createElement(
        CardContent,
        {},
        React.createElement(
          "div",
          { className: "flex flex-col gap-4" },
          React.createElement(
            "div",
            { className: "grid gap-2" },
            React.createElement(Label, { htmlFor: "email" }, "Email"),
            React.createElement(Input, {
              id: "email",
              type: "email",
              placeholder: "m@example.com",
            })
          ),
          React.createElement(
            "div",
            { className: "grid gap-2" },
            React.createElement(
              "div",
              { className: "flex items-center" },
              React.createElement(Label, { htmlFor: "password" }, "Password"),
              React.createElement(
                "a",
                {
                  href: "#",
                  className:
                    "ml-auto inline-block text-sm underline-offset-4 hover:underline",
                },
                "Forgot your password?"
              )
            ),
            React.createElement(Input, { id: "password", type: "password" })
          )
        )
      ),
      React.createElement(
        CardFooter,
        { className: "flex-col gap-2" },
        React.createElement(
          Button,
          { type: "submit", className: "w-full" },
          "Login"
        ),
        React.createElement(
          Button,
          { variant: "outline", className: "w-full" },
          "Login with Google"
        )
      )
    ),
  },
  props: [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the card.",
    },
  ],
};

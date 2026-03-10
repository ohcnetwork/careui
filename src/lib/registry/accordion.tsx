import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ComponentDoc } from "@/lib/types";

export const accordionDoc: ComponentDoc = {
  id: "accordion",
  name: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each reveal a section of content.",
  installation: {
    cli: "npx shadcn@latest add accordion",
    manual:
      "Copy and paste the accordion component source code into your project.",
  },
  usage: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  preview: {
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="max-w-lg"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5-7 days), express (2-3 days), and overnight
          shipping. Free shipping on international orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          Returns accepted within 30 days. Items must be unused and in original
          packaging. Refunds processed within 5-7 business days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
        <AccordionContent>
          Reach us via email, live chat, or phone. We respond within 24 hours
          during business days.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    component: React.createElement(
      Accordion,
      { type: "single", collapsible: true, defaultValue: "shipping", className: "max-w-lg" },
      React.createElement(
        AccordionItem,
        { value: "shipping" },
        React.createElement(AccordionTrigger, {}, "What are your shipping options?"),
        React.createElement(
          AccordionContent,
          {},
          "We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders."
        )
      ),
      React.createElement(
        AccordionItem,
        { value: "returns" },
        React.createElement(AccordionTrigger, {}, "What is your return policy?"),
        React.createElement(
          AccordionContent,
          {},
          "Returns accepted within 30 days. Items must be unused and in original packaging. Refunds processed within 5-7 business days."
        )
      ),
      React.createElement(
        AccordionItem,
        { value: "support" },
        React.createElement(AccordionTrigger, {}, "How can I contact customer support?"),
        React.createElement(
          AccordionContent,
          {},
          "Reach us via email, live chat, or phone. We respond within 24 hours during business days."
        )
      )
    ),
  },

  examples: [
    // ── Basic ──────────────────────────────────────────────────────────────
    {
      name: "Basic",
      description:
        "A basic accordion that shows one item at a time. The first item is open by default.",
      code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    value: "item-1",
    trigger: "How do I reset my password?",
    content:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
  },
  {
    value: "item-2",
    trigger: "Can I change my subscription plan?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
  },
  {
    value: "item-3",
    trigger: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
]

export function AccordionBasic() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}`,
      preview: React.createElement(
        Accordion,
        { type: "single", collapsible: true, defaultValue: "item-1", className: "max-w-lg" },
        ...[
          {
            value: "item-1",
            trigger: "How do I reset my password?",
            content:
              "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
          },
          {
            value: "item-2",
            trigger: "Can I change my subscription plan?",
            content:
              "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
          },
          {
            value: "item-3",
            trigger: "What payment methods do you accept?",
            content:
              "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
          },
        ].map((item) =>
          React.createElement(
            AccordionItem,
            { key: item.value, value: item.value },
            React.createElement(AccordionTrigger, {}, item.trigger),
            React.createElement(AccordionContent, {}, item.content)
          )
        )
      ),
    },

    // ── Multiple ───────────────────────────────────────────────────────────
    {
      name: "Multiple",
      description:
        'Use type="multiple" to allow multiple items to be open at the same time.',
      code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    value: "notifications",
    trigger: "Notification Settings",
    content:
      "Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices.",
  },
  {
    value: "privacy",
    trigger: "Privacy & Security",
    content:
      "Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, review active sessions, and configure data sharing preferences.",
  },
  {
    value: "billing",
    trigger: "Billing & Subscription",
    content:
      "View your current plan, payment history, and upcoming invoices. Update your payment method, change your subscription tier, or cancel your subscription.",
  },
]

export function AccordionMultiple() {
  return (
    <Accordion type="multiple" className="max-w-lg" defaultValue={["notifications"]}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}`,
      preview: React.createElement(
        Accordion,
        { type: "multiple", className: "max-w-lg", defaultValue: ["notifications"] },
        ...[
          {
            value: "notifications",
            trigger: "Notification Settings",
            content:
              "Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices.",
          },
          {
            value: "privacy",
            trigger: "Privacy & Security",
            content:
              "Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, review active sessions, and configure data sharing preferences.",
          },
          {
            value: "billing",
            trigger: "Billing & Subscription",
            content:
              "View your current plan, payment history, and upcoming invoices. Update your payment method, change your subscription tier, or cancel your subscription.",
          },
        ].map((item) =>
          React.createElement(
            AccordionItem,
            { key: item.value, value: item.value },
            React.createElement(AccordionTrigger, {}, item.trigger),
            React.createElement(AccordionContent, {}, item.content)
          )
        )
      ),
    },

    // ── Disabled ───────────────────────────────────────────────────────────
    {
      name: "Disabled",
      description:
        "Use the disabled prop on AccordionItem to disable individual items.",
      code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDisabled() {
  return (
    <Accordion type="single" collapsible className="max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I access my account history?</AccordionTrigger>
        <AccordionContent>
          Yes, you can view your complete account history including all
          transactions, plan changes, and support tickets in the Account History
          section of your dashboard.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Premium feature information</AccordionTrigger>
        <AccordionContent>
          This section contains information about premium features. Upgrade your
          plan to access this content.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How do I update my email address?</AccordionTrigger>
        <AccordionContent>
          You can update your email address in your account settings. You'll
          receive a verification email at your new address to confirm the change.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
      preview: React.createElement(
        Accordion,
        { type: "single", collapsible: true, className: "max-w-lg" },
        React.createElement(
          AccordionItem,
          { value: "item-1" },
          React.createElement(AccordionTrigger, {}, "Can I access my account history?"),
          React.createElement(
            AccordionContent,
            {},
            "Yes, you can view your complete account history including all transactions, plan changes, and support tickets in the Account History section of your dashboard."
          )
        ),
        React.createElement(
          AccordionItem,
          { value: "item-2", disabled: true },
          React.createElement(AccordionTrigger, {}, "Premium feature information"),
          React.createElement(
            AccordionContent,
            {},
            "This section contains information about premium features. Upgrade your plan to access this content."
          )
        ),
        React.createElement(
          AccordionItem,
          { value: "item-3" },
          React.createElement(AccordionTrigger, {}, "How do I update my email address?"),
          React.createElement(
            AccordionContent,
            {},
            "You can update your email address in your account settings. You'll receive a verification email at your new address to confirm the change."
          )
        )
      ),
    },

    // ── Borders ────────────────────────────────────────────────────────────
    {
      name: "Borders",
      description:
        "Add border to the Accordion and border-b last:border-b-0 to AccordionItem to add borders to the items.",
      code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    value: "billing",
    trigger: "How does billing work?",
    content:
      "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime.",
  },
  {
    value: "security",
    trigger: "Is my data secure?",
    content:
      "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits.",
  },
  {
    value: "integration",
    trigger: "What integrations do you support?",
    content:
      "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more.",
  },
]

export function AccordionBorders() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg rounded-lg border"
      defaultValue="billing"
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="border-b px-4 last:border-b-0"
        >
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}`,
      preview: React.createElement(
        Accordion,
        {
          type: "single",
          collapsible: true,
          className: "max-w-lg rounded-lg border",
          defaultValue: "billing",
        },
        ...[
          {
            value: "billing",
            trigger: "How does billing work?",
            content:
              "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime.",
          },
          {
            value: "security",
            trigger: "Is my data secure?",
            content:
              "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits.",
          },
          {
            value: "integration",
            trigger: "What integrations do you support?",
            content:
              "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more.",
          },
        ].map((item) =>
          React.createElement(
            AccordionItem,
            { key: item.value, value: item.value, className: "border-b px-4 last:border-b-0" },
            React.createElement(AccordionTrigger, {}, item.trigger),
            React.createElement(AccordionContent, {}, item.content)
          )
        )
      ),
    },

    // ── Card ───────────────────────────────────────────────────────────────
    {
      name: "Card",
      description: "Wrap the Accordion in a Card component.",
      code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const items = [
  {
    value: "plans",
    trigger: "What subscription plans do you offer?",
    content:
      "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month).",
  },
  {
    value: "billing",
    trigger: "How does billing work?",
    content:
      "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers.",
  },
  {
    value: "cancel",
    trigger: "How do I cancel my subscription?",
    content:
      "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your current billing period.",
  },
]

export function AccordionCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Subscription & Billing</CardTitle>
        <CardDescription>
          Common questions about your account, plans, payments and cancellations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="plans">
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}`,
      preview: React.createElement(
        Card,
        { className: "w-full max-w-sm" },
        React.createElement(
          CardHeader,
          {},
          React.createElement(CardTitle, {}, "Subscription & Billing"),
          React.createElement(
            CardDescription,
            {},
            "Common questions about your account, plans, payments and cancellations."
          )
        ),
        React.createElement(
          CardContent,
          {},
          React.createElement(
            Accordion,
            { type: "single", collapsible: true, defaultValue: "plans" },
            ...[
              {
                value: "plans",
                trigger: "What subscription plans do you offer?",
                content:
                  "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month).",
              },
              {
                value: "billing",
                trigger: "How does billing work?",
                content:
                  "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers.",
              },
              {
                value: "cancel",
                trigger: "How do I cancel my subscription?",
                content:
                  "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your current billing period.",
              },
            ].map((item) =>
              React.createElement(
                AccordionItem,
                { key: item.value, value: item.value },
                React.createElement(AccordionTrigger, {}, item.trigger),
                React.createElement(AccordionContent, {}, item.content)
              )
            )
          )
        )
      ),
    },
  ],
};

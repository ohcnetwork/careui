import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "careui";

export function Default() {
  return (
    <Accordion type="single" defaultValue="item-1" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is careui?</AccordionTrigger>
        <AccordionContent>
          careui is a design system built on Radix UI primitives with Tailwind CSS. It provides accessible, composable components for healthcare applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          Run <code>pnpm add careui</code> in your project directory and import the components you need.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes, all components follow WAI-ARIA guidelines and are fully keyboard navigable with screen reader support.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function Multiple() {
  return (
    <Accordion type="multiple" defaultValue={["billing", "privacy"]} className="w-full max-w-md">
      <AccordionItem value="billing">
        <AccordionTrigger>Billing &amp; Payments</AccordionTrigger>
        <AccordionContent>
          We accept all major credit cards, bank transfers, and enterprise invoicing. Invoices are generated monthly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="privacy">
        <AccordionTrigger>Data Privacy</AccordionTrigger>
        <AccordionContent>
          Your data is encrypted at rest and in transit. We are HIPAA compliant and undergo annual security audits.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>Support Options</AccordionTrigger>
        <AccordionContent>
          Enterprise customers get 24/7 phone support. All other plans receive email support with a 24-hour response SLA.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function Collapsed() {
  return (
    <Accordion type="single" className="w-full max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          Manage your profile, password, and notification preferences from the account settings page.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Team Management</AccordionTrigger>
        <AccordionContent>
          Invite teammates, assign roles, and manage permissions for your organization.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Integrations</AccordionTrigger>
        <AccordionContent>
          Connect careui with your existing EHR, scheduling tools, and communication platforms.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

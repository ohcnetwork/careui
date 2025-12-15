import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from 'lucide-react'

export const alertDoc: ComponentDoc = {

    id: 'alert',
    name: 'Alert',
    description: 'Displays a callout for user attention.',
    installation: {
      cli: 'npx shadcn@latest add alert',
      manual: 'Copy and paste the alert component source code into your project.'
    },
    usage: `import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-sm items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>
          This is an alert with icon, title and description.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          Please verify your billing information and try again.
        </AlertDescription>
      </Alert>
    </div>
  )
}`,
    preview: {
      code: `<Alert>
  <CheckCircle2Icon />
  <AlertTitle>Success! Your changes have been saved</AlertTitle>
  <AlertDescription>
    This is an alert with icon, title and description.
  </AlertDescription>
</Alert>`,
      component: React.createElement(Alert, {},
        React.createElement(CheckCircle2Icon, { className: 'h-4 w-4' }),
        React.createElement(AlertTitle, {}, 'Success! Your changes have been saved'),
        React.createElement(AlertDescription, {}, 'This is an alert with icon, title and description.')
      )
    },
    examples: [
      {
        name: 'Info Alert',
        description: 'An informational alert with custom icon.',
        code: `<Alert>
  <PopcornIcon />
  <AlertTitle>
    This Alert has a title and an icon. No description.
  </AlertTitle>
</Alert>`,
        preview: React.createElement(Alert, {},
          React.createElement(PopcornIcon, { className: 'h-4 w-4' }),
          React.createElement(AlertTitle, {}, 'This Alert has a title and an icon. No description.')
        )
      },
      {
        name: 'Destructive Alert',
        description: 'A destructive alert with detailed error information.',
        code: `<Alert variant="destructive">
  <AlertCircleIcon />
  <AlertTitle>Unable to process your payment.</AlertTitle>
  <AlertDescription>
    <p>Please verify your billing information and try again.</p>
    <ul className="list-inside list-disc text-sm">
      <li>Check your card details</li>
      <li>Ensure sufficient funds</li>
      <li>Verify billing address</li>
    </ul>
  </AlertDescription>
</Alert>`,
        preview: React.createElement(Alert, { variant: 'destructive' },
          React.createElement(AlertCircleIcon, { className: 'h-4 w-4' }),
          React.createElement(AlertTitle, {}, 'Unable to process your payment.'),
          React.createElement(AlertDescription, {},
            React.createElement('p', {}, 'Please verify your billing information and try again.'),
            React.createElement('ul', { className: 'list-inside list-disc text-sm' },
              React.createElement('li', {}, 'Check your card details'),
              React.createElement('li', {}, 'Ensure sufficient funds'),
              React.createElement('li', {}, 'Verify billing address')
            )
          )
        )
      }
    ]
}

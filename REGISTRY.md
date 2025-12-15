# Care UI - Component Registry

A modern React component library built with Tailwind CSS and Radix UI.

## Installation

Install components from the Care UI registry using the shadcn CLI:

```bash
npx shadcn@latest add button --registry https://careui.vercel.app
```

## Available Components

### Form Components
- **Button** - Displays a button or a component that looks like a button
- **Input** - Form input field component
- **Label** - Accessible label for form controls
- **Checkbox** - Toggle between checked and unchecked states
- **Switch** - Two-state toggle control
- **Radio Group** - Set of radio buttons
- **Select** - Dropdown selection component
- **Textarea** - Multi-line text input
- **Slider** - Range input slider
- **Calendar** - Date picker component
- **Form** - Form validation with react-hook-form

### Layout Components
- **Card** - Card with header, content, and footer
- **Separator** - Visual content separator
- **Tabs** - Tabbed content sections
- **Accordion** - Collapsible content sections
- **Table** - Responsive table component
- **Breadcrumb** - Navigation breadcrumb
- **Sidebar** - Composable sidebar component

### Overlay Components
- **Dialog** - Modal dialog window
- **Drawer** - Slide-out drawer panel
- **Sheet** - Side panel overlay
- **Alert Dialog** - Confirmation dialog
- **Popover** - Floating popup content
- **Hover Card** - Content preview on hover
- **Tooltip** - Contextual information tooltip
- **Dropdown Menu** - Action menu dropdown
- **Context Menu** - Right-click context menu
- **Command** - Command palette menu
- **Navigation Menu** - Site navigation menu
- **Menubar** - Application menu bar

### Feedback Components
- **Alert** - Attention callouts
- **Toast** - Temporary notifications
- **Progress** - Progress indicator
- **Skeleton** - Loading placeholders
- **Spinner** - Loading spinner
- **Badge** - Status badges
- **Avatar** - User avatar with fallback

### Utility Components
- **Scroll Area** - Custom scrollable area
- **Resizable** - Resizable panels
- **Toggle** - Two-state button
- **Toggle Group** - Group of toggle buttons
- **Aspect Ratio** - Maintain aspect ratio
- **Empty** - Empty state display
- **Kbd** - Keyboard shortcut display
- **Item** - Reusable list item
- **Field** - Form field wrapper
- **Input Group** - Input with prefix/suffix
- **Input OTP** - One-time password input
- **Button Group** - Grouped buttons
- **Carousel** - Image/content carousel
- **Chart** - Data visualization charts
- **Collapsible** - Expandable content

## Usage

### Install a single component

```bash
npx shadcn@latest add button --registry https://careui.vercel.app
```

### Install multiple components

```bash
npx shadcn@latest add button input label card --registry https://careui.vercel.app
```

### Configure as default registry

Add to your `components.json`:

```json
{
  "registries": {
    "care-ui": "https://careui.vercel.app"
  }
}
```

Then install with:

```bash
npx shadcn@latest add care-ui:button
```

## Documentation

Visit [https://careui.vercel.app](https://careui.vercel.app) for full documentation and examples.

## License

MIT

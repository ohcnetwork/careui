#!/usr/bin/env tsx
/**
 * Script to create individual component registry files
 * This extracts components from the old component-registry.ts and creates separate files
 */

import fs from 'fs/promises'
import path from 'path'

const components = [
  'alert', 'alert-dialog', 'aspect-ratio', 'avatar', 'breadcrumb', 'button-group',
  'calendar', 'card', 'carousel', 'chart', 'checkbox', 'collapsible', 'command',
  'context-menu', 'dialog', 'drawer', 'dropdown-menu', 'empty', 'field',
  'hover-card', 'input', 'input-group', 'input-otp', 'item', 'kbd', 'label',
  'menubar', 'navigation-menu', 'pagination', 'popover', 'progress', 'radio-group',
  'resizable', 'scroll-area', 'select', 'separator', 'sheet', 'sidebar',
  'skeleton', 'slider', 'sonner', 'spinner', 'switch', 'syntax-highlighted-code',
  'table', 'tabs', 'textarea', 'toggle', 'toggle-group', 'tooltip'
]

async function createPlaceholderFiles() {
  const registryDir = path.join(process.cwd(), 'src/lib/registry')

  for (const component of components) {
    const fileName = `${component}.tsx`
    const filePath = path.join(registryDir, fileName)

    // Check if file already exists
    try {
      await fs.access(filePath)
      console.log(`⏭️  Skipping ${fileName} (already exists)`)
      continue
    } catch {
      // File doesn't exist, create it
    }

    const camelCase = component.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1)

    const content = `import React from 'react'
import { type ComponentDoc } from '@/lib/types'

export const ${camelCase}Doc: ComponentDoc = {
  id: '${component}',
  name: '${pascalCase.replace(/([A-Z])/g, ' $1').trim()}',
  description: 'Component description here.',
  installation: {
    cli: 'npx shadcn@latest add ${component}',
    manual: 'Copy and paste the component source code into your project.'
  },
  usage: \`import { ${pascalCase} } from "@/components/ui/${component}"\`,
  examples: [
    {
      name: 'Default',
      description: 'Default example.',
      code: \`<${pascalCase} />\`,
      preview: React.createElement('div', { className: 'text-sm text-muted-foreground' }, '${pascalCase} component')
    }
  ]
}
`

    await fs.writeFile(filePath, content)
    console.log(`✅ Created ${fileName}`)
  }

  console.log(`\n✨ Created ${components.length} component files!`)
}

createPlaceholderFiles().catch(console.error)

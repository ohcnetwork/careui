/**
 * Populate Registry Files with Real Data
 *
 * This script extracts component data from the old component-registry.ts
 * and populates the new registry files with actual content instead of placeholders.
 */

import fs from 'fs'
import path from 'path'

const OLD_REGISTRY_PATH = path.join(process.cwd(), 'src/lib/component-registry.ts')
const NEW_REGISTRY_DIR = path.join(process.cwd(), 'src/lib/registry')

// Read the old registry file
const oldRegistryContent = fs.readFileSync(OLD_REGISTRY_PATH, 'utf-8')

// Extract component data from the old registry
function extractComponentData(componentId: string): string | null {
  // Try both quoted and unquoted versions
  const patterns = [
    // Quoted key (e.g., 'alert-dialog':)
    new RegExp(
      `['"]${componentId}['"]:\\s*{([\\s\\S]*?)(?=\\n  },\\n  (?:['"][a-z-]+['"]:|[a-z]+:)|\\n}\\n(?:export|$))`,
      'i'
    ),
    // Unquoted key (e.g., alert:)
    new RegExp(
      `${componentId}:\\s*{([\\s\\S]*?)(?=\\n  },\\n  (?:['"][a-z-]+['"]:|[a-z]+:)|\\n}\\n(?:export|$))`,
      'i'
    )
  ]

  for (const pattern of patterns) {
    const match = oldRegistryContent.match(pattern)
    if (match) {
      return match[1]
    }
  }

  console.log(`⚠️  Could not find ${componentId} in old registry`)
  return null
}

// Extract imports needed for a component
function extractImportsForComponent(componentData: string): string[] {
  const imports: string[] = []

  // Look for React.createElement calls to identify needed components
  // Exclude icon names (things ending with 'Icon')
  const createElementPattern = /React\.createElement\(([A-Z][a-zA-Z0-9]*?)(?:,|\))/g
  let match

  while ((match = createElementPattern.exec(componentData)) !== null) {
    const componentName = match[1]
    // Skip icons and already added components
    if (!componentName.endsWith('Icon') && !imports.includes(componentName)) {
      imports.push(componentName)
    }
  }

  return imports
}

// Convert kebab-case to camelCase
function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

// Convert kebab-case to PascalCase
function toPascalCase(str: string): string {
  const camel = toCamelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

// Generate component file content
function generateComponentFile(componentId: string, componentData: string): string {
  const componentName = toPascalCase(componentId)
  const exportName = toCamelCase(componentId) + 'Doc'

  // Extract component names that need to be imported
  const componentImports = extractImportsForComponent(componentData)

  // Build import statements
  const imports: string[] = [
    "import React from 'react'",
    "import { type ComponentDoc } from '@/lib/types'"
  ]

  // Add component import if needed
  if (componentImports.length > 0) {
    // Map component names to their import paths
    const uiPath = `@/components/ui/${componentId}`
    imports.push(`import { ${componentImports.join(', ')} } from '${uiPath}'`)
  }

  // Look for icon imports (lucide-react)
  const iconPattern = /([A-Z][a-zA-Z0-9]*Icon)/g
  const icons = new Set<string>()
  let iconMatch

  while ((iconMatch = iconPattern.exec(componentData)) !== null) {
    icons.add(iconMatch[1])
  }

  if (icons.size > 0) {
    imports.push(`import { ${Array.from(icons).join(', ')} } from 'lucide-react'`)
  }

  return `${imports.join('\n')}

export const ${exportName}: ComponentDoc = {
${componentData}
}
`
}

// Main execution
async function main() {
  console.log('🔄 Starting registry population...')

  // List of components to migrate (excluding already done ones)
  const componentsToMigrate = [
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'avatar',
    'breadcrumb',
    'button-group',
    'calendar',
    'card',
    'carousel',
    'chart',
    'checkbox',
    'collapsible',
    'command',
    'context-menu',
    'dialog',
    'drawer',
    'dropdown-menu',
    'empty',
    'field',
    'hover-card',
    'input',
    'input-group',
    'input-otp',
    'item',
    'kbd',
    'label',
    'menubar',
    'navigation-menu',
    'pagination',
    'popover',
    'progress',
    'radio-group',
    'resizable',
    'scroll-area',
    'select',
    'separator',
    'sheet',
    'sidebar',
    'skeleton',
    'slider',
    'sonner',
    'spinner',
    'switch',
    'syntax-highlighted-code',
    'table',
    'tabs',
    'textarea',
    'toggle',
    'toggle-group',
    'tooltip'
  ]

  let successCount = 0
  let failCount = 0

  for (const componentId of componentsToMigrate) {
    const componentData = extractComponentData(componentId)

    if (!componentData) {
      failCount++
      continue
    }

    const fileContent = generateComponentFile(componentId, componentData)
    const filePath = path.join(NEW_REGISTRY_DIR, `${componentId}.tsx`)

    fs.writeFileSync(filePath, fileContent, 'utf-8')
    console.log(`✅ Updated ${componentId}.tsx`)
    successCount++
  }

  console.log(`\\n✨ Migration complete!`)
  console.log(`   ✅ Successfully migrated: ${successCount}`)
  console.log(`   ❌ Failed: ${failCount}`)
}

main().catch(console.error)

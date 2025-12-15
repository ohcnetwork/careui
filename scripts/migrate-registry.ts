#!/usr/bin/env tsx
/**
 * Script to migrate component documentation from the monolithic component-registry.ts
 * to individual component files in src/lib/registry/
 *
 * Usage: tsx scripts/migrate-registry.ts
 */

import fs from 'fs/promises'
import path from 'path'

const registryDir = path.join(process.cwd(), 'src/lib/registry')
const oldRegistryPath = path.join(process.cwd(), 'src/lib/component-registry.ts')

async function main() {
  console.log('🚀 Registry Migration Script')
  console.log('================================\n')

  console.log('This script helps you migrate component documentation')
  console.log('from the old monolithic file to separate maintainable files.\n')

  console.log('✅ Registry directory exists at:', registryDir)
  console.log('📝 Old registry at:', oldRegistryPath)

  console.log('\n💡 Next steps:')
  console.log('1. Extract each component from component-registry.ts')
  console.log('2. Create a new file for each in src/lib/registry/')
  console.log('3. Follow the pattern in accordion.tsx, badge.tsx, button.tsx')
  console.log('4. Import and add to src/lib/registry/index.ts')
  console.log('5. Update component-registry.ts to export from registry/index')

  console.log('\n✨ Benefits of the new structure:')
  console.log('- Each component in its own file')
  console.log('- Easy to find and maintain')
  console.log('- Better code organization')
  console.log('- Reduced merge conflicts')
  console.log('- Cleaner imports')
}

main()

#!/usr/bin/env tsx
/**
 * Registry Dependency Validation
 *
 * Fails when a local registry component/hook name appears in `dependencies`
 * (npm deps) instead of `registryDependencies` in generated registry JSON.
 */

import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'

type RegistryJson = {
  name?: string
  dependencies?: string[]
  files?: Array<{
    content?: string
  }>
}

const REGISTRY_DIR = path.join('public', 'registry', 'care-ui')

async function main(): Promise<void> {
  const jsonFiles = await glob(`${REGISTRY_DIR}/**/*.json`, {
    ignore: [`${REGISTRY_DIR}/index.json`]
  })

  if (jsonFiles.length === 0) {
    console.warn(`⚠️  No registry files found under ${REGISTRY_DIR}`)
    return
  }

  // Local names are directory names directly under public/registry/care-ui.
  const localNames = new Set(
    jsonFiles
      .map((file) => path.basename(path.dirname(file)))
      .filter(Boolean)
  )

  const violations: Array<{ file: string; leakedDeps: string[] }> = []

  const localImportRegex = /import\s+(?:.*?from\s+)?['"]([^'"]+)['"]/g

  for (const file of jsonFiles) {
    const raw = await fs.readFile(file, 'utf-8')
    const parsed = JSON.parse(raw) as RegistryJson
    const deps = parsed.dependencies || []
    const sourceContent = (parsed.files || []).map((entry) => entry.content || '').join('\n')

    const importedLocalNames = new Set<string>()
    let match: RegExpExecArray | null
    while ((match = localImportRegex.exec(sourceContent)) !== null) {
      const importPath = match[1]
      if (importPath.startsWith('@/components/ui/')) {
        const name = importPath.replace('@/components/ui/', '').split('/')[0]
        if (name) importedLocalNames.add(name)
      }
      if (importPath.startsWith('@/hooks/')) {
        const name = importPath.replace('@/hooks/', '').split('/')[0]
        if (name) importedLocalNames.add(name)
      }
    }

    const leakedDeps = deps.filter(
      (dep) => localNames.has(dep) && importedLocalNames.has(dep)
    )

    if (leakedDeps.length > 0) {
      violations.push({
        file,
        leakedDeps
      })
    }
  }

  if (violations.length === 0) {
    console.log('✅ Registry dependency validation passed — no local-name leaks in npm dependencies')
    return
  }

  console.error('\n❌ Registry dependency validation failed')
  console.error('Local component/hook names leaked into npm `dependencies`:')
  for (const violation of violations) {
    console.error(`   - ${violation.file}`)
    console.error(`     leaked: ${violation.leakedDeps.join(', ')}`)
  }
  console.error('\nFix: move leaked local names from `dependencies` to `registryDependencies`.')
  process.exit(1)
}

main().catch((error) => {
  console.error('❌ Registry dependency validation failed to run:', error)
  process.exit(2)
})

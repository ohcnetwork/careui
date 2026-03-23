#!/usr/bin/env tsx
/**
 * Registry Generation Script
 *
 * Automatically generates shadcn/ui compatible registry JSON files
 * from working components in src/components/ui/
 *
 * Features:
 * - Extracts component metadata from JSDoc comments
 * - Auto-detects dependencies from imports
 * - Generates CLI-compatible JSON registry files
 * - Maintains single source of truth
 */

import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'

interface ComponentFile {
  path: string
  content: string
  type: 'registry:component' | 'registry:ui' | 'registry:hook' | 'registry:lib'
  target: string
}

interface ComponentMeta {
  name: string
  type: 'registry:ui' | 'registry:block' | 'registry:component'
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: ComponentFile[]
}

interface RegistryConfig {
  componentsDir: string
  hooksDir: string
  registryDir: string
  registryBaseUrl: string
  excludeFiles: string[]
  dependencyMap: Record<string, string[]>
}

const CONFIG: RegistryConfig = {
  componentsDir: 'src/components/ui',
  hooksDir: 'src/hooks',
  registryDir: 'public/registry/care-ui',
  registryBaseUrl: 'https://careui.ohc.network/registry/care-ui',
  excludeFiles: ['index.ts', 'types.ts'],
  // Map of common imports to their package names
  dependencyMap: {
    // Unified Radix package (new shadcn/new-york style)
    'radix-ui': ['radix-ui'],
    'class-variance-authority': ['class-variance-authority'],
    'vaul': ['vaul'],
    'recharts': ['recharts'],
    '@tanstack/react-table': ['@tanstack/react-table'],
    'lucide-react': ['lucide-react'],
    '@base-ui/react': ['@base-ui/react']
  }
}

/**
 * Extract JSDoc metadata from component file
 */
function extractMetadata(content: string, fileName: string): Partial<ComponentMeta> {
  const componentName = path.parse(fileName).name

  // Extract JSDoc block
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//)
  if (!jsdocMatch) {
    return {
      name: componentName,
      description: `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} component`,
      dependencies: [],
      type: 'registry:ui'
    }
  }

  const jsdoc = jsdocMatch[1]

  // Extract @description
  const descMatch = jsdoc.match(/@description\s+(.+?)(?=@|\*\/|$)/s)
  const description = descMatch ? descMatch[1].trim().replace(/\s*\*\s*/g, ' ') :
    `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} component`

  // Extract @dependencies
  const depsMatch = jsdoc.match(/@dependencies\s+(.+?)(?=@|\*\/|$)/s)
  const dependencies = depsMatch ?
    depsMatch[1].trim().replace(/\s*\*\s*/g, ' ').split(/[\s,]+/).filter(Boolean) : []

  // Extract @type
  const typeMatch = jsdoc.match(/@type\s+(.+?)(?=@|\*\/|$)/s)
  const type = typeMatch ? typeMatch[1].trim() as ComponentMeta['type'] : 'registry:ui'

  // Extract @registryDependencies
  const regDepsMatch = jsdoc.match(/@registryDependencies\s+(.+?)(?=@|\*\/|$)/s)
  const registryDependencies = regDepsMatch
    ? regDepsMatch[1].trim().replace(/\s*\*\s*/g, ' ').split(/[\s,]+/).filter(Boolean)
    : []

  return {
    name: componentName,
    description,
    dependencies,
    registryDependencies,
    type
  }
}

/**
 * Auto-detect dependencies from import statements
 */
function detectDependencies(content: string): string[] {
  const dependencies = new Set<string>()

  // Find all import statements
  const importRegex = /import\s+(?:.*?from\s+)?['"]([^'"]+)['"]/g
  let match

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]

    // Check if it's an external dependency
    for (const [pattern, deps] of Object.entries(CONFIG.dependencyMap)) {
      if (importPath.includes(pattern)) {
        deps.forEach(dep => dependencies.add(dep))
      }
    }
  }

  return Array.from(dependencies)
}

/**
 * Process a single component file
 */
async function processComponent(filePath: string): Promise<ComponentMeta> {
  const content = await fs.readFile(filePath, 'utf-8')
  const fileName = path.basename(filePath)
  const componentName = path.parse(fileName).name

  // Extract metadata
  const metadata = extractMetadata(content, fileName)
  const autoDeps = detectDependencies(content)
  const allDeps = [...new Set([...metadata.dependencies || [], ...autoDeps])]

  const isHook = (metadata.type || 'registry:ui') === 'registry:hook'
  const fileExt = path.extname(fileName)
  const fileType = isHook ? 'registry:hook' : 'registry:component'
  const targetDir = isHook ? 'hooks' : 'components/careui'

  return {
    name: metadata.name || componentName,
    type: metadata.type || 'registry:ui',
    description: metadata.description || `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} component`,
    dependencies: allDeps.length > 0 ? allDeps : undefined,
    registryDependencies: metadata.registryDependencies && metadata.registryDependencies.length > 0 ? metadata.registryDependencies : undefined,
    files: [{
      path: `registry/care-ui/${componentName}/${componentName}${fileExt}`,
      content,
      type: fileType,
      target: `${targetDir}/${componentName}${fileExt}`
    }]
  }
}

/**
 * Ensure directory exists
 */
async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath)
  } catch {
    await fs.mkdir(dirPath, { recursive: true })
  }
}

/**
 * Write registry JSON file
 */
async function writeRegistryFile(component: ComponentMeta, localNames: Set<string>): Promise<void> {
  const outputDir = path.join(CONFIG.registryDir, component.name)
  const outputFile = path.join(outputDir, `${component.name}.json`)

  await ensureDir(outputDir)

  // Resolve bare local names to full URLs; leave full URLs and official names as-is
  const resolvedDeps = (component.registryDependencies || []).map(dep => {
    if (dep.startsWith('http')) return dep
    if (localNames.has(dep)) {
      return `${CONFIG.registryBaseUrl}/${dep}/${dep}.json`
    }
    return dep
  })

  const registryData = {
    name: component.name,
    type: component.type,
    dependencies: component.dependencies,
    registryDependencies: resolvedDeps,
    files: component.files
  }

  await fs.writeFile(outputFile, JSON.stringify(registryData, null, 2))
  console.log(`✓ Generated ${component.name}.json`)
}

/**
 * Generate index.json with all components
 */
async function generateIndex(components: ComponentMeta[]): Promise<void> {
  const index = components.map(comp => ({
    name: comp.name,
    type: comp.type,
    dependencies: comp.dependencies,
    files: comp.files.map(file => file.path)
  }))

  await fs.writeFile(
    path.join(CONFIG.registryDir, 'index.json'),
    JSON.stringify(index, null, 2)
  )
  console.log(`✓ Generated index.json with ${components.length} components`)
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('🚀 Starting registry generation...')

  try {
    // Find all component + hook files
    const componentFiles = await glob(`${CONFIG.componentsDir}/*.tsx`, {
      ignore: CONFIG.excludeFiles.map(file => `${CONFIG.componentsDir}/${file}`)
    })
    const hookFiles = await glob(`${CONFIG.hooksDir}/*.ts`)
    const allFiles = [...componentFiles, ...hookFiles]

    if (allFiles.length === 0) {
      console.warn('⚠️  No component files found')
      return
    }

    console.log(`📁 Found ${componentFiles.length} component files, ${hookFiles.length} hook files`)

    // Ensure registry directory exists
    await ensureDir(CONFIG.registryDir)

    // Process each component
    const components: ComponentMeta[] = []
    for (const filePath of allFiles) {
      try {
        const component = await processComponent(filePath)
        components.push(component)
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error)
      }
    }

    // Build set of all local component/hook names for URL resolution
    const localNames = new Set(components.map(c => c.name))

    // Write registry files (resolves local deps to full URLs)
    for (const component of components) {
      try {
        await writeRegistryFile(component, localNames)
      } catch (error) {
        console.error(`❌ Error writing ${component.name}:`, error)
      }
    }

    // Generate index
    await generateIndex(components)

    console.log(`\n✅ Successfully generated registry for ${components.length} components`)
    console.log(`📝 Registry location: ${CONFIG.registryDir}`)
    console.log('\n💡 You can now run: npx shadcn@latest add [component-name]')

  } catch (error) {
    console.error('❌ Registry generation failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { main as generateRegistry, CONFIG as registryConfig }

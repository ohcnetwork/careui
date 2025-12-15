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

interface ComponentMeta {
  name: string
  description: string
  dependencies: string[]
  type: 'registry:ui' | 'registry:block' | 'registry:example'
  registryDependencies?: string[]
  files: {
    name: string
    content: string
    type: 'registry:ui' | 'registry:block' | 'registry:example'
  }[]
}

interface RegistryConfig {
  componentsDir: string
  registryDir: string
  excludeFiles: string[]
  dependencyMap: Record<string, string[]>
}

const CONFIG: RegistryConfig = {
  componentsDir: 'src/components/ui',
  registryDir: 'registry/care-ui',
  excludeFiles: ['index.ts', 'types.ts'],
  // Map of common imports to their package names
  dependencyMap: {
    '@radix-ui/react-slot': ['@radix-ui/react-slot'],
    '@radix-ui/react-dialog': ['@radix-ui/react-dialog'],
    '@radix-ui/react-dropdown-menu': ['@radix-ui/react-dropdown-menu'],
    '@radix-ui/react-accordion': ['@radix-ui/react-accordion'],
    '@radix-ui/react-switch': ['@radix-ui/react-switch'],
    '@radix-ui/react-checkbox': ['@radix-ui/react-checkbox'],
    '@radix-ui/react-select': ['@radix-ui/react-select'],
    '@radix-ui/react-separator': ['@radix-ui/react-separator'],
    '@radix-ui/react-progress': ['@radix-ui/react-progress'],
    '@radix-ui/react-tooltip': ['@radix-ui/react-tooltip'],
    'class-variance-authority': ['class-variance-authority'],
    'vaul': ['vaul'],
    'recharts': ['recharts'],
    'lucide-react': ['lucide-react']
  }
}

/**
 * Extract JSDoc metadata from component file
 */
function extractMetadata(content: string, fileName: string): Partial<ComponentMeta> {
  const componentName = path.basename(fileName, '.tsx')

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

  return {
    name: componentName,
    description,
    dependencies,
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
 * Generate usage example for component
 */
function generateUsageExample(componentName: string, content: string): string {
  // Extract export names
  const exportMatch = content.match(/export\s*\{\s*([^}]+)\s*\}/s)
  if (!exportMatch) {
    return `import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from "@/components/ui/${componentName}";`
  }

  const exports = exportMatch[1]
    .split(',')
    .map(exp => exp.trim())
    .filter(Boolean)

  const mainExport = exports[0]

  return `import { ${exports.join(', ')} } from "@/components/ui/${componentName}";

export default function Example() {
  return <${mainExport}>${componentName.charAt(0).toUpperCase() + componentName.slice(1)}</${mainExport}>;
}`
}

/**
 * Process a single component file
 */
async function processComponent(filePath: string): Promise<ComponentMeta> {
  const content = await fs.readFile(filePath, 'utf-8')
  const fileName = path.basename(filePath)
  const componentName = path.basename(filePath, '.tsx')

  // Extract metadata
  const metadata = extractMetadata(content, fileName)
  const autoDeps = detectDependencies(content)
  const allDeps = [...new Set([...metadata.dependencies || [], ...autoDeps])]

  return {
    name: metadata.name || componentName,
    description: metadata.description || `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} component`,
    type: metadata.type || 'registry:ui',
    dependencies: allDeps,
    registryDependencies: metadata.registryDependencies || [],
    files: [{
      name: fileName,
      content,
      type: metadata.type || 'registry:ui'
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
async function writeRegistryFile(component: ComponentMeta): Promise<void> {
  const outputDir = path.join(CONFIG.registryDir, component.name)
  const outputFile = path.join(outputDir, `${component.name}.json`)

  await ensureDir(outputDir)

  const registryData = {
    name: component.name,
    type: component.type,
    dependencies: component.dependencies,
    registryDependencies: component.registryDependencies || [],
    files: component.files,
    docs: component.docs
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
    files: comp.files.map(f => f.name)
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
    // Find all component files
    const componentFiles = await glob(`${CONFIG.componentsDir}/*.tsx`, {
      ignore: CONFIG.excludeFiles.map(file => `${CONFIG.componentsDir}/${file}`)
    })

    if (componentFiles.length === 0) {
      console.warn('⚠️  No component files found')
      return
    }

    console.log(`📁 Found ${componentFiles.length} component files`)

    // Ensure registry directory exists
    await ensureDir(CONFIG.registryDir)

    // Process each component
    const components: ComponentMeta[] = []
    for (const filePath of componentFiles) {
      try {
        const component = await processComponent(filePath)
        components.push(component)
        await writeRegistryFile(component)
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error)
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

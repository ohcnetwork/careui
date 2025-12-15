/**
 * Component Registry - Main Export
 *
 * This file exports the modular registry structure with lazy loading support.
 * Individual component documentation is maintained in src/lib/registry/
 *
 * @see src/lib/registry/README.md for documentation on the registry structure
 */

import { type ComponentDoc } from '@/lib/types'
import { componentRegistry, loadComponentDoc, getComponentIds } from './registry'

/**
 * Component documentation registry (legacy sync access)
 * @deprecated Use loadComponentDoc() for better code-splitting
 */
export const componentDocs: Record<string, ComponentDoc> = componentRegistry

// Export dynamic loading functions
export { loadComponentDoc, getComponentIds }
export { componentRegistry } from './registry'
export type { ComponentDoc } from '@/lib/types'

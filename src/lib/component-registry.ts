/**
 * Component Registry - Main Export
 *
 * This file exports the modular registry structure.
 * Individual component documentation is maintained in src/lib/registry/
 *
 * @see src/lib/registry/README.md for documentation on the registry structure
 */

import { type ComponentDoc } from '@/lib/types'
import { componentRegistry } from './registry'

/**
 * Component documentation registry
 * All components are defined in separate files under src/lib/registry/
 */
export const componentDocs: Record<string, ComponentDoc> = componentRegistry

// Re-export for convenience
export { componentRegistry } from './registry'
export type { ComponentDoc } from '@/lib/types'

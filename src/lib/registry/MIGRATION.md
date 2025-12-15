# Component Registry Migration

## Overview
Refactoring the monolithic `component-registry.ts` (3000+ lines) into separate, maintainable files.

## Status: ✅ COMPLETED

All 53 components have been successfully migrated to the new modular structure!

### ✅ All Components Migrated (53/53)

- [x] accordion
- [x] alert
- [x] alert-dialog
- [x] aspect-ratio
- [x] avatar
- [x] badge
- [x] breadcrumb
- [x] button
- [x] button-group
- [x] calendar
- [x] card
- [x] carousel
- [x] chart
- [x] checkbox
- [x] collapsible
- [x] command
- [x] context-menu
- [x] dialog
- [x] drawer
- [x] dropdown-menu
- [x] empty
- [x] field
- [x] hover-card
- [x] input
- [x] input-group
- [x] input-otp
- [x] item
- [x] kbd
- [x] label
- [x] menubar
- [x] navigation-menu
- [x] pagination
- [x] popover
- [x] progress
- [x] radio-group
- [x] resizable
- [x] scroll-area
- [x] select
- [x] separator
- [x] sheet
- [x] sidebar
- [x] skeleton
- [x] slider
- [x] sonner
- [x] spinner
- [x] switch
- [x] syntax-highlighted-code
- [x] table
- [x] tabs
- [x] textarea
- [x] toggle
- [x] toggle-group
- [x] tooltip

## Migration Steps

For each component:

1. **Create file**: `src/lib/registry/{component-name}.tsx`
2. **Copy template**: Use `_template.tsx` as starting point
3. **Extract data**: Find component in old `component-registry.ts`
4. **Import component**: Add actual component import
5. **Update preview**: Replace placeholder with real component
6. **Register**: Add to `registry/index.ts`
7. **Test**: Verify in dev server
8. **Remove old**: Delete from old file

## Quick Start

```bash
# 1. Copy template for new component
cp src/lib/registry/_template.tsx src/lib/registry/alert.tsx

# 2. Edit the file and replace placeholders

# 3. Add to registry/index.ts:
#    import { alertDoc } from './alert'
#
#    export const componentRegistry = {
#      ...
#      alert: alertDoc,
#    }

# 4. Test
npm run dev
```

## Benefits

| Old Structure | New Structure |
|--------------|---------------|
| Single 3000+ line file | 53 small focused files |
| Hard to navigate | Easy to find |
| Merge conflicts | Independent changes |
| Everything loaded | Can lazy load if needed |

## File Structure

```
src/lib/
├── component-registry.ts (OLD - 3000+ lines)
├── component-registry-new.ts (NEW - exports from registry/)
└── registry/
    ├── README.md (Documentation)
    ├── _template.tsx (Template for new components)
    ├── index.ts (Main registry)
    ├── accordion.tsx (✅ Done)
    ├── badge.tsx (✅ Done)
    ├── button.tsx (✅ Done)
    └── ... (50 more to migrate)
```

## Timeline

- **Phase 1**: Create infrastructure ✅
- **Phase 2**: Migrate 3 components (examples) ✅
- **Phase 3**: Migrate remaining 50 components 📋
- **Phase 4**: Switch imports to new registry
- **Phase 5**: Remove old component-registry.ts

## Notes

- Keep old file until all components migrated
- Each component file is ~50-150 lines (manageable)
- Follow naming conventions strictly
- Test each component after migration

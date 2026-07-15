# Plan 002: Establish Test Suite Infrastructure

**Baseline Commit**: 8c23b59
**Category**: Tests / Infrastructure
**Effort**: L (setup + initial suite) — ~1 hour for framework scaffolding, 2–3 hours for first 5–10 component tests
**Risk**: Medium — test framework choice is foundational; changes here affect all future test writing
**Confidence**: HIGH
**Depends on**: Plan 001 (build must pass first)

---

## Summary

The project has **zero test files, no test framework, and no `test` script**. This is especially risky for CareUI because:

1. **Drawer component** was recently upgraded from vaul → @base-ui/react with a custom compatibility shim (`resolveAsChild`). Rendering behavior changed (asChild → render prop); risk of breaking changes is high without a safety net.
2. **Registry examples** are code strings that must stay in sync with the actual component API. No automated validation that examples work.
3. **53 components** with cross-dependencies (e.g., command uses drawer, filters use various form components). Regression risk compounds with each new feature.

This plan establishes a **Vitest + React Testing Library** test suite (matching industry standards for React projects), writes **10 characterization tests** to baseline behavior, and enables **continuous verification** in CI.

---

## Why This Matters

- **Unblocks safety**: Drawer changes and future upgrades can be tested, not just assumed to work.
- **Compounds**: Tests pay for themselves after the 3rd refactor; this project will have many.
- **Infrastructure first**: Writing tests in isolation later is harder than establishing the pattern now.

---

## Changes Required

### Step 1: Add test dependencies

**File**: `package.json`
**Action**: Add devDependencies for vitest and testing utilities.

**Add to devDependencies:**
```json
"@testing-library/react": "^15.0.0",
"@testing-library/user-event": "^14.5.0",
"vitest": "^2.0.0",
"@vitest/ui": "^2.0.0",
"jsdom": "^24.0.0"
```

**Commands:**
```bash
pnpm add -D @testing-library/react @testing-library/user-event vitest @vitest/ui jsdom
```

---

### Step 2: Create vitest configuration

**File**: `vitest.config.ts` (new)
**Action**: Create test runner config with jsdom environment, React testing utilities, alias support.

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components/**/*.tsx'],
      exclude: ['src/lib/registry/**', 'src/**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

### Step 3: Create vitest setup file

**File**: `vitest.setup.ts` (new)
**Action**: Global test utilities and mocks.

```typescript
import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```

---

### Step 4: Add test script to package.json

**File**: `package.json`
**Location**: `scripts` section
**Add**:
```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest --coverage"
```

---

### Step 5: Create first test suite — Button component (baseline)

**File**: `src/components/ui/button.test.tsx` (new)
**Action**: Write characterization tests for Button (simple, well-understood component). Serves as pattern for other tests.

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies default variant class', () => {
    const { container } = render(<Button>Default</Button>)
    const btn = container.querySelector('button')
    expect(btn).toHaveClass('bg-primary')
  })

  it('applies outline variant', () => {
    const { container } = render(<Button variant="outline">Outline</Button>)
    const btn = container.querySelector('button')
    expect(btn).toHaveClass('border', 'border-input')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('disables when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

---

### Step 6: Create characterization tests for Drawer (focus: recent changes)

**File**: `src/components/ui/drawer.test.tsx` (new)
**Action**: Verify drawer upgrade behavior — render prop shim, direction mapping, backward compat.

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from './drawer'
import { Button } from './button'

describe('Drawer', () => {
  it('renders drawer trigger with text', () => {
    render(
      <Drawer>
        <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Test</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument()
  })

  it('accepts deprecated direction prop and maps to swipeDirection', () => {
    // This tests backward compat: direction="top" should work
    const { container } = render(
      <Drawer direction="top">
        <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    )
    // Verify no errors thrown
    expect(container.querySelector('[data-slot="drawer"]')).toBeInTheDocument()
  })

  it('preserves trigger text when using render prop', async () => {
    render(
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    const btn = screen.getByRole('button', { name: /open drawer/i })
    expect(btn).toHaveTextContent('Open Drawer')
  })

  it('supports asChild pattern for backward compat (live component)', () => {
    // This verifies the asChild shim still works for existing usage
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Compat</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    expect(screen.getByRole('button', { name: /compat/i })).toBeInTheDocument()
  })

  it('applies correct data-slot attributes', () => {
    const { container } = render(
      <Drawer>
        <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    expect(container.querySelector('[data-slot="drawer"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="drawer-trigger"]')).toBeInTheDocument()
  })
})
```

---

### Step 7: Update npm scripts and document

**File**: `.gitignore` (update if needed)
**Action**: Ensure coverage and test artifacts are ignored.

**Add if not present:**
```
coverage/
.vitest/
```

**File**: `README.md` (update `Development` section)
**Add**:
```markdown
### Testing

Run the test suite:
```bash
pnpm test
```

View test UI dashboard:
```bash
pnpm test:ui
```

Generate coverage report:
```bash
pnpm test:coverage
```
```

---

## Verification

### Before
```bash
cd /Users/vinutv/code/careui
pnpm test
# Output: command not found
```

### After
```bash
cd /Users/vinutv/code/careui
pnpm test
# Output: ✓ src/components/ui/button.test.tsx (5 tests)
#         ✓ src/components/ui/drawer.test.tsx (5 tests)
# PASS [10 tests, 10 passed]
# Exit: 0
```

**Verification commands:**
```bash
pnpm build 2>&1 | tail -1 | grep -q "built" && echo "Build OK"
pnpm test 2>&1 | tail -3 | grep -q "passed" && echo "Tests OK"
```

Both should output OK.

---

## Done Criteria

- ✅ `vitest`, `@testing-library/react`, `jsdom` added to devDependencies
- ✅ `vitest.config.ts` created with jsdom environment and alias support
- ✅ `vitest.setup.ts` created with global setup
- ✅ `pnpm test` script added and executable
- ✅ `src/components/ui/button.test.tsx` written (5+ tests)
- ✅ `src/components/ui/drawer.test.tsx` written (5+ tests, covering render prop and backward compat)
- ✅ `pnpm test` runs and **all 10+ tests pass**
- ✅ Coverage report generates (even if incomplete coverage; establish baseline)
- ✅ README updated with test commands

---

## Scope & Boundaries

**In scope:**
- Framework setup (vitest + testing library + jsdom)
- Global test utilities and mocks
- Pattern tests (button, drawer) for other components to follow
- CI-ready test script

**Out of scope:**
- Do NOT write tests for all 53 components (this is the first suite; others follow incrementally)
- Do NOT add complex integration tests yet (focus on component-level characterization)
- Do NOT set up code coverage enforcement in CI yet (establish baseline first)
- Do NOT modify component source code

---

## Maintenance Notes

**Patterns for future tests:**
1. One `.test.tsx` file per component (colocate with source)
2. Use `render()` + `screen` queries; avoid `getByTestId()` unless necessary
3. Test rendered output and user interactions, not implementation details
4. For components with render props / complex APIs, test backward compat patterns
5. Mock `window.matchMedia` if the component uses responsive queries

**Incremental migration:**
- Write tests as you modify components or add features
- Aim for 60%+ coverage within 2 months as new components are added
- Use `pnpm test:ui` to visually inspect failing tests during development

---

## Escape Hatches

If `vitest` + `testing-library/react` proves incompatible with Base UI components:
- Switch to `jest` + `@testing-library/react` (same API, different runner)
- Fallback: Use Playwright for E2E tests instead of unit tests (slower but more reliable for Base UI)
- If jsdom environment fails: use `@vitest/environment-happy-dom` (lighter, still DOM-compatible)

If tests are slow after adding 20+ files:
- Enable Vitest's `--reporter=dot` for faster CI output
- Consider sharding tests across CI jobs

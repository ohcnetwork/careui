import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // Component library files export both components and utilities/hooks by design.
  // react-refresh HMR boundaries don't apply to published library code.
  {
    files: [
      'src/components/ui/**/*.{ts,tsx}',
      'src/components/careui/**/*.{ts,tsx}',
      'src/components/theme-provider.tsx',
      'src/components/font-size-provider.tsx',
      'src/lib/registry/**/*.{ts,tsx}',
      'src/contexts/**/*.{ts,tsx}',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  // Registry demo files use React.createElement with data-* attributes that require
  // type assertions — suppressing no-explicit-any for these non-production demo files.
  {
    files: ['src/lib/registry/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])

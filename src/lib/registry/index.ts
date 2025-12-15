/**
 * Component Registry Index
 *
 * This file provides lazy loading for component documentation.
 * Each component is loaded on-demand to reduce initial bundle size.
 */

import { type ComponentDoc } from '@/lib/types'

// Components overview page
const componentsOverviewDoc: ComponentDoc = {
  id: 'components-overview',
  name: 'Components',
  description: 'Browse all available UI components in the Care UI library.',
  installation: {
    cli: '',
    manual: ''
  },
  usage: 'Select any component from the grid to view its documentation, examples, and usage instructions.',
  preview: {
    code: 'Click any component card to explore its documentation.',
    component: null
  }
}

/**
 * Lazy loading functions for each component
 */
const componentLoaders: Record<string, () => Promise<{ default: ComponentDoc }>> = {
  'components-overview': async () => ({ default: componentsOverviewDoc }),
  accordion: () => import('./accordion').then(m => ({ default: m.accordionDoc })),
  alert: () => import('./alert').then(m => ({ default: m.alertDoc })),
  'alert-dialog': () => import('./alert-dialog').then(m => ({ default: m.alertDialogDoc })),
  'aspect-ratio': () => import('./aspect-ratio').then(m => ({ default: m.aspectRatioDoc })),
  avatar: () => import('./avatar').then(m => ({ default: m.avatarDoc })),
  badge: () => import('./badge').then(m => ({ default: m.badgeDoc })),
  breadcrumb: () => import('./breadcrumb').then(m => ({ default: m.breadcrumbDoc })),
  button: () => import('./button').then(m => ({ default: m.buttonDoc })),
  'button-group': () => import('./button-group').then(m => ({ default: m.buttonGroupDoc })),
  calendar: () => import('./calendar').then(m => ({ default: m.calendarDoc })),
  card: () => import('./card').then(m => ({ default: m.cardDoc })),
  carousel: () => import('./carousel').then(m => ({ default: m.carouselDoc })),
  chart: () => import('./chart').then(m => ({ default: m.chartDoc })),
  checkbox: () => import('./checkbox').then(m => ({ default: m.checkboxDoc })),
  collapsible: () => import('./collapsible').then(m => ({ default: m.collapsibleDoc })),
  command: () => import('./command').then(m => ({ default: m.commandDoc })),
  'context-menu': () => import('./context-menu').then(m => ({ default: m.contextMenuDoc })),
  dialog: () => import('./dialog').then(m => ({ default: m.dialogDoc })),
  drawer: () => import('./drawer').then(m => ({ default: m.drawerDoc })),
  'dropdown-menu': () => import('./dropdown-menu').then(m => ({ default: m.dropdownMenuDoc })),
  empty: () => import('./empty').then(m => ({ default: m.emptyDoc })),
  field: () => import('./field').then(m => ({ default: m.fieldDoc })),
  'hover-card': () => import('./hover-card').then(m => ({ default: m.hoverCardDoc })),
  input: () => import('./input').then(m => ({ default: m.inputDoc })),
  'input-group': () => import('./input-group').then(m => ({ default: m.inputGroupDoc })),
  'input-otp': () => import('./input-otp').then(m => ({ default: m.inputOtpDoc })),
  item: () => import('./item').then(m => ({ default: m.itemDoc })),
  kbd: () => import('./kbd').then(m => ({ default: m.kbdDoc })),
  label: () => import('./label').then(m => ({ default: m.labelDoc })),
  menubar: () => import('./menubar').then(m => ({ default: m.menubarDoc })),
  'navigation-menu': () => import('./navigation-menu').then(m => ({ default: m.navigationMenuDoc })),
  pagination: () => import('./pagination').then(m => ({ default: m.paginationDoc })),
  popover: () => import('./popover').then(m => ({ default: m.popoverDoc })),
  progress: () => import('./progress').then(m => ({ default: m.progressDoc })),
  'radio-group': () => import('./radio-group').then(m => ({ default: m.radioGroupDoc })),
  resizable: () => import('./resizable').then(m => ({ default: m.resizableDoc })),
  'scroll-area': () => import('./scroll-area').then(m => ({ default: m.scrollAreaDoc })),
  select: () => import('./select').then(m => ({ default: m.selectDoc })),
  separator: () => import('./separator').then(m => ({ default: m.separatorDoc })),
  sheet: () => import('./sheet').then(m => ({ default: m.sheetDoc })),
  skeleton: () => import('./skeleton').then(m => ({ default: m.skeletonDoc })),
  slider: () => import('./slider').then(m => ({ default: m.sliderDoc })),
  sonner: () => import('./sonner').then(m => ({ default: m.sonnerDoc })),
  spinner: () => import('./spinner').then(m => ({ default: m.spinnerDoc })),
  switch: () => import('./switch').then(m => ({ default: m.switchDoc })),
  table: () => import('./table').then(m => ({ default: m.tableDoc })),
  tabs: () => import('./tabs').then(m => ({ default: m.tabsDoc })),
  textarea: () => import('./textarea').then(m => ({ default: m.textareaDoc })),
  toggle: () => import('./toggle').then(m => ({ default: m.toggleDoc })),
  'toggle-group': () => import('./toggle-group').then(m => ({ default: m.toggleGroupDoc })),
  tooltip: () => import('./tooltip').then(m => ({ default: m.tooltipDoc })),
}

/**
 * Load a component doc dynamically
 */
export async function loadComponentDoc(id: string): Promise<ComponentDoc | null> {
  const loader = componentLoaders[id]
  if (!loader) return null

  const module = await loader()
  return module.default
}

/**
 * Get list of all component IDs
 */
export function getComponentIds(): string[] {
  return Object.keys(componentLoaders)
}

/**
 * Legacy sync registry - loads all components (use sparingly)
 * @deprecated Use loadComponentDoc for better code-splitting
 */
export const componentRegistry: Record<string, ComponentDoc> = {}

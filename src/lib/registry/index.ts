/**
 * Component Registry Index
 *
 * This file imports and exports all component documentation.
 * Each component has its own file in the registry directory for better maintainability.
 */

import { type ComponentDoc } from '@/lib/types'

// Import all component docs
import { accordionDoc } from './accordion'
import { alertDoc } from './alert'
import { alertDialogDoc } from './alert-dialog'
import { aspectRatioDoc } from './aspect-ratio'
import { avatarDoc } from './avatar'
import { badgeDoc } from './badge'
import { breadcrumbDoc } from './breadcrumb'
import { buttonDoc } from './button'
import { buttonGroupDoc } from './button-group'
import { calendarDoc } from './calendar'
import { cardDoc } from './card'
import { carouselDoc } from './carousel'
import { chartDoc } from './chart'
import { checkboxDoc } from './checkbox'
import { collapsibleDoc } from './collapsible'
import { commandDoc } from './command'
import { contextMenuDoc } from './context-menu'
import { dialogDoc } from './dialog'
import { drawerDoc } from './drawer'
import { dropdownMenuDoc } from './dropdown-menu'
import { emptyDoc } from './empty'
import { fieldDoc } from './field'
import { hoverCardDoc } from './hover-card'
import { inputDoc } from './input'
import { inputGroupDoc } from './input-group'
import { inputOtpDoc } from './input-otp'
import { itemDoc } from './item'
import { kbdDoc } from './kbd'
import { labelDoc } from './label'
import { menubarDoc } from './menubar'
import { navigationMenuDoc } from './navigation-menu'
import { paginationDoc } from './pagination'
import { popoverDoc } from './popover'
import { progressDoc } from './progress'
import { radioGroupDoc } from './radio-group'
import { resizableDoc } from './resizable'
import { scrollAreaDoc } from './scroll-area'
import { selectDoc } from './select'
import { separatorDoc } from './separator'
import { sheetDoc } from './sheet'
import { skeletonDoc } from './skeleton'
import { sliderDoc } from './slider'
import { sonnerDoc } from './sonner'
import { spinnerDoc } from './spinner'
import { switchDoc } from './switch'
import { tableDoc } from './table'
import { tabsDoc } from './tabs'
import { textareaDoc } from './textarea'
import { toggleDoc } from './toggle'
import { toggleGroupDoc } from './toggle-group'
import { tooltipDoc } from './tooltip'

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
 * All component documentation organized alphabetically
 */
export const componentRegistry: Record<string, ComponentDoc> = {
  'components-overview': componentsOverviewDoc,
  accordion: accordionDoc,
  alert: alertDoc,
  'alert-dialog': alertDialogDoc,
  'aspect-ratio': aspectRatioDoc,
  avatar: avatarDoc,
  badge: badgeDoc,
  breadcrumb: breadcrumbDoc,
  button: buttonDoc,
  'button-group': buttonGroupDoc,
  calendar: calendarDoc,
  card: cardDoc,
  carousel: carouselDoc,
  chart: chartDoc,
  checkbox: checkboxDoc,
  collapsible: collapsibleDoc,
  command: commandDoc,
  'context-menu': contextMenuDoc,
  dialog: dialogDoc,
  drawer: drawerDoc,
  'dropdown-menu': dropdownMenuDoc,
  empty: emptyDoc,
  field: fieldDoc,
  'hover-card': hoverCardDoc,
  input: inputDoc,
  'input-group': inputGroupDoc,
  'input-otp': inputOtpDoc,
  item: itemDoc,
  kbd: kbdDoc,
  label: labelDoc,
  menubar: menubarDoc,
  'navigation-menu': navigationMenuDoc,
  pagination: paginationDoc,
  popover: popoverDoc,
  progress: progressDoc,
  'radio-group': radioGroupDoc,
  resizable: resizableDoc,
  'scroll-area': scrollAreaDoc,
  select: selectDoc,
  separator: separatorDoc,
  sheet: sheetDoc,
  skeleton: skeletonDoc,
  slider: sliderDoc,
  sonner: sonnerDoc,
  spinner: spinnerDoc,
  switch: switchDoc,
  table: tableDoc,
  tabs: tabsDoc,
  textarea: textareaDoc,
  toggle: toggleDoc,
  'toggle-group': toggleGroupDoc,
  tooltip: tooltipDoc,
}

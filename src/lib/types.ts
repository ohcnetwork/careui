export interface ComponentExample {
  name: string;
  description: string;
  /** Optional large section heading rendered above this example as a visual divider. */
  heading?: string;
  items?: Array<{ title: string; description: string }>;
  code?: string;
  preview?: React.ReactNode;
  /** Optional props table rendered below this example, scoped to this component/variant. */
  trailingProps?: { title: string; description?: string; props: Array<{ name: string; type: string; description: string; default?: string }> };
}

export interface DocumentationPage {
  id: string;
  title: string;
  description: string;
  content: {
    sections: Array<{
      title: string;
      content: string;
      code?: string;
    }>;
  };
}

export interface ComponentDoc {
  id: string;
  name: string;
  description: string | React.ReactNode;
  installation: {
    cli: string;
    manual: string;
  };
  usage: string;
  preview: {
    code: string;
    component: React.ReactNode;
  };
  examples?: ComponentExample[];
  props?: Array<{
    name: string;
    type: string;
    description: string;
    default?: string;
  }>;
  propSections?: Array<{
    title: string;
    description?: string;
    props: Array<{ name: string; type: string; description: string; default?: string }>;
  }>;
}

export interface NavItem {
  id: string;
  title: string;
  url?: string;
  items?: NavItem[];
}

export interface AppState {
  activeComponent: string;
  versions: string[];
  navMain: NavItem[];
}

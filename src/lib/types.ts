export interface ComponentExample {
  name: string;
  description: string;
  items?: Array<{ title: string; description: string }>;
  code?: string;
  preview?: React.ReactNode;
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
  description: string;
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

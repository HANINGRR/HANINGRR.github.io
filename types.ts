export interface ContentSection {
  heading?: string;
  body?: string;
  list?: string[];
  columns?: { title: string; desc: string }[];
  type: 'text' | 'list' | 'columns' | 'key-value';
  keyValueData?: { label: string; value: string }[];
}

export interface Topic {
  id: string;
  title: string;
  enTitle: string;
  description: string;
  content: ContentSection[];
}

export interface GeneratedContent {
  prediction: string;
  metaphor: string;
}

export type ViewState = 'SPLASH' | 'DASHBOARD' | 'DETAIL';
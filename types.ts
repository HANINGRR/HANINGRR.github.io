export interface KeyValue {
    label: string;
    value: string;
}

export interface Column {
    title: string;
    desc: string;
}

export interface ContentSection {
    heading?: string;
    type: 'text' | 'list' | 'key-value' | 'columns';
    body?: string;
    list?: string[];
    keyValueData?: KeyValue[];
    columns?: Column[];
}

export interface Topic {
    id: string;
    title: string;
    enTitle: string;
    description: string;
    content: ContentSection[];
}
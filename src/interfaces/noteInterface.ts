export interface noteData {
  _id: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  creator: string;
}

export interface formValues {
  title: string;
  content: string;
  tag: string;
  tags: string[];
  categoryTitle: string;
}

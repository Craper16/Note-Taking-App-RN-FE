export interface noteData {
  _id: string;
  category: {_id: string; title: string; createdAt: Date; updatedAt: Date};
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  creator: string;
}

export interface updateNoteValues {
  noteId: string;
  title: string;
  content: string;
  tags: string[];
}

export interface formValues {
  title: string;
  content: string;
  tag: string;
  tags: string[];
  categoryTitle: string;
}

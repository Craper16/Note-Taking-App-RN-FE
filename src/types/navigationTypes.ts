export type RootStackParams = {
  AuthStack: undefined;
  BottomRootStack: undefined;
};

export type BottomRootStackNavigatorParams = {
  MainStack: undefined;
  CategoryStack: undefined;
  SearchStack: undefined;
  SettingsStack: undefined;
};

export type SearchNavigatorStackParams = {
  Search: undefined;
  filteredNote: {noteId: string};
  UpdateFilteredNote: {
    noteId: string;
    title: string;
    content: string;
    tags: string[];
  };
};

export type CategoryNavigatorStackParams = {
  Categories: undefined;
  CategoryDetails: {categoryId: string; categoryTitle: string};
  AddCategory: undefined;
};

export type SettingsNavigatorStackParams = {
  Settings: undefined;
  AboutMe: {username: string};
};

export type MainStackParams = {
  Notes: undefined;
  Note: {noteId: string};
  AddNote: undefined;
  UpdateNote: {noteId: string; title: string; content: string; tags: string[]};
};

export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
};

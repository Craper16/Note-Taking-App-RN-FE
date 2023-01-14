export type RootStackParams = {
  AuthStack: undefined;
  MainStack: undefined;
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

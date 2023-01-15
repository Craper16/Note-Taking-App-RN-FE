export type RootStackParams = {
  AuthStack: undefined;
  BottomRootStack: undefined;
};

export type BottomRootStackNavigatorParams = {
  MainStack: undefined;
  CategoryStack: undefined;
  SettingsStack: undefined;
};

export type CategoryNavigatorStackParams = {
  Categories: undefined;
}

export type SettingsNavigatorStackParams = {
  Settings: undefined;
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

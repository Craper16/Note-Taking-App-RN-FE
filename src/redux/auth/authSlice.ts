import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {authModel} from '../../interfaces/authInterface';

const initialState: authModel = {
  accessToken: null,
  username: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{accessToken: string; username: string}>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.username = action.payload.username;
    },
    defaultState: state => {
      state.accessToken = initialState.accessToken;
      state.username = initialState.username;
    },
  },
});

export const {setUser, defaultState} = authSlice.actions;

export default authSlice.reducer;

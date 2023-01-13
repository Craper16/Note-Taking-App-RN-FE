import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

interface notesModel {
  notesData: noteData[];
  filteredData: noteData[];
  isEnd: boolean;
}

const initialState: notesModel = {
  notesData: [],
  filteredData: [],
  isEnd: false,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<{data: noteData[]}>) => {
      state.notesData = [...state.notesData, ...action.payload.data];
      state.isEnd = action.payload.data?.length === 0;
    },
    setNote: (state, action: PayloadAction<{data: noteData}>) => {
      state.notesData = [action.payload.data, ...state.notesData];
    },
    defaultNotes: state => {
      state.notesData = initialState.notesData;
      state.filteredData = initialState.filteredData;
      state.isEnd = initialState.isEnd;
    },
  },
});

export const {setNotes, defaultNotes, setNote} = notesSlice.actions;

export default notesSlice.reducer;

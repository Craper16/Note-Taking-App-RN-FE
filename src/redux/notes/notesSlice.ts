import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {noteData, updateNoteValues} from '../../interfaces/noteInterface';

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
    removeNote: (state, action: PayloadAction<{noteId: string}>) => {
      state.notesData = [
        ...state.notesData.filter(note => note._id !== action.payload.noteId),
      ];
    },
    updateNote: (
      state,
      action: PayloadAction<{noteId: string; data: noteData}>,
    ) => {
      state.notesData = [
        action.payload.data,
        ...state.notesData.filter(note => note._id !== action.payload.noteId),
      ];
    },
    defaultNotes: state => {
      state.notesData = initialState.notesData;
      state.filteredData = initialState.filteredData;
      state.isEnd = initialState.isEnd;
    },
  },
});

export const {setNotes, defaultNotes, setNote, removeNote, updateNote} =
  notesSlice.actions;

export default notesSlice.reducer;

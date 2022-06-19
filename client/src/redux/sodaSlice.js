import { createSlice } from "@reduxjs/toolkit";
import { mockSodas } from "../utils/mock";

const initialState = {
  selectedId: null,
  // sodas: null,
  sodas: mockSodas,
};

const sodaSlice = createSlice({
  name: "soda",
  initialState: initialState,
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload
    },
    setSoda: (state, action) => {
      state.sodas = action.payload
    },
  },
});

export const {
  setSelectedId,
  setSoda,
} = sodaSlice.actions;
export default sodaSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
// import { mockSodas } from "../utils/mock";

const initialState = {
  selectedId: null,
  sodas: null,
};

const sodaSlice = createSlice({
  name: "soda",
  initialState: initialState,
  reducers: {
    dispenseSoda: (state, action) => {
      const sodaCopy = JSON.parse(JSON.stringify(state.sodas))
      const idx = sodaCopy.findIndex(s => s.id === action.payload.id)
      sodaCopy[idx] = action.payload
      state.sodas = sodaCopy
    },
    setSelectedId: (state, action) => {
      // out of stock - prevent selection
      if (state.sodas && state.sodas.find(s => s.id === action.payload)?.currentInventory < 1) {
        state.selectedId = null;
      } else {
        state.selectedId = action.payload
      }
    },
    setSodas: (state, action) => {
      state.sodas = action.payload
    },
  },
});

export const {
  dispenseSoda,
  setSelectedId,
  setSodas,
} = sodaSlice.actions;
export default sodaSlice.reducer;

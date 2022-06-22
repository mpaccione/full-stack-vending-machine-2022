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
    setSelectedId: (state, action) => {
      state.selectedId = action.payload
    },
    setSodas: (state, action) => {
      state.sodas = action.payload
    },
  },
});

export const {
  setSelectedId,
  setSodas,
} = sodaSlice.actions;
export default sodaSlice.reducer;

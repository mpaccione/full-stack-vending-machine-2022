import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sodas: null,
};

const sodaSlice = createSlice({
  name: "soda",
  initialState: initialState,
  reducers: {
    setSoda: (state, action) => {
      state.sodas = action.payload
    },
  },
});

export const {
  setSoda,
} = sodaSlice.actions;
export default sodaSlice.reducer;

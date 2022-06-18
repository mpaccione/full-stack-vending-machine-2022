import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorMessage: "",
    successMessage: "",
    userData: {
        email: null,
        id: null,
        jwt: null,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        clearErrorMessage: (state) => {
            // seperate for potential flexibility
            state.errorMessage = "";
        },
        clearSuccessMessage: (state) => {
            // seperate for potential flexibility
            state.successMessage = ""; 
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setMobile: (state, action) => {
            state.mobile = action.payload;
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
});

export const {
    clearErrorMessage,
    clearSuccessMessage,
    setErrorMessage,
    setSuccessMessage,
    setUser,
} = userSlice.actions;
export default userSlice.reducer;

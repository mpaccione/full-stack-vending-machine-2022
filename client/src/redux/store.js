import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sodaReducer from "./sodaSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  soda: sodaReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

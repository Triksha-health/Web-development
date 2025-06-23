import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Define a type for the slice state
export interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

export const adminData = createSlice({
  name: "adminData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = adminData.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.adminData;

export default adminData.reducer;

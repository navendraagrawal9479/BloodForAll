import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data.push(action.payload)
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;

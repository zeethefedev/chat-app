import { createSlice, isAnyOf } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "reducer-name",
  initialState: {},
  reducers: {
    setInfo: (state, action) => {},
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(logOutWithFirebase.fulfilled, (state, action) => {})
    //   .addMatcher(isAnyOf(logInWithFirebase.pending), (state) => {
    //     state.loading = true;
    //   });
  },
});

export const { setInfo } = slice.actions;

export default slice.reducer;

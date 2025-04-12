import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/get", async (id) => {
  //   const response = await blogApiByID(id);
  //   return response;
});

import { createSlice } from "@reduxjs/toolkit";
import {
  signInUser,
  signOutUser,
  fetchMessages,
  addMessage,
} from "../api/thunk";
import { getErrorMessage } from "../utils/auth.utils";

export const slice = createSlice({
  name: "chat",
  initialState: {
    user: null,
    messages: [],
    loading: false,
    error: null,
    lastMessageTimestamp: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateLastMessageTimestamp: (state, action) => {
      state.lastMessageTimestamp = action.payload;
    },
    updateMessages: (state, action) => {
      const messages = action.payload;
      state.messages = messages;
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        state.lastMessageTimestamp = lastMessage.timestamp;
      }
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Auth cases
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.messages = [];
        state.loading = false;
        state.error = null;
        state.lastMessageTimestamp = null;
      })
      // Messages cases
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const messages = action.payload;
        state.messages = messages;
        if (messages.length > 0) {
          const lastMessage = messages[messages.length - 1];
          state.lastMessageTimestamp = lastMessage.timestamp;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        const newMessage = action.payload;
        const newMessages = [...state.messages, newMessage];

        state.messages = newMessages;
        state.lastMessageTimestamp = newMessage.timestamp;
        state.loading = false;
        state.error = null;
      })
      // Loading and error cases
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const error = action.payload;
          state.loading = false;
          state.error = getErrorMessage(error);
        }
      );
  },
});

export const { clearError, updateLastMessageTimestamp, updateMessages } =
  slice.actions;

export default slice.reducer;

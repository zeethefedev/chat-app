import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signOutUser, fetchDocuments, addDocument } from "../api/thunk";

const getErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';
  
  // Firebase auth error codes
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    default:
      return error.message || 'An error occurred';
  }
};

export const slice = createSlice({
  name: "chat",
  initialState: {
    user: null,
    messages: [],
    loading: false,
    error: null,
    lastMessageTimestamp: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateLastMessageTimestamp: (state, action) => {
      state.lastMessageTimestamp = action.payload;
    }
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
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.messages = action.payload;
        if (action.payload.length > 0) {
          state.lastMessageTimestamp = action.payload[action.payload.length - 1].timestamp;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(addDocument.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.lastMessageTimestamp = action.payload.timestamp;
        state.loading = false;
        state.error = null;
      })
      // Loading and error cases
      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = getErrorMessage(action.payload);
        }
      );
  },
});

export const { clearError, updateLastMessageTimestamp } = slice.actions;

export default slice.reducer;

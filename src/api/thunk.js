import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Thunk for signing in a user
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for signing out a user
export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for adding a document to Firestore
export const addDocument = createAsyncThunk(
  "firestore/addDocument",
  async ({ collectionName, data }, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching documents from Firestore
export const fetchDocuments = createAsyncThunk(
  "firestore/fetchDocuments",
  async (collectionName, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return documents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching data
export const fetchData = createAsyncThunk("data/get", async (id) => {
  //   const response = await blogApiByID(id);
  //   return response;
});

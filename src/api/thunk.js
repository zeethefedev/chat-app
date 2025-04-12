import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// Thunk for signing in a user
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
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

// Thunk for adding a document to Firestore with server timestamp
export const addDocument = createAsyncThunk(
  "firestore/addDocument",
  async ({ collectionName, data }, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        timestamp: serverTimestamp(),
      });
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
      const q = query(
        collection(db, collectionName),
        orderBy("timestamp", "asc")
      );
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp:
          doc.data().timestamp?.toDate?.().toISOString() ||
          new Date().toISOString(),
      }));
      return documents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Function to subscribe to real-time updates
export const subscribeToCollection = (collectionName, callback) => {
  const q = query(collection(db, collectionName), orderBy("timestamp", "asc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp:
          doc.data().timestamp?.toDate?.().toISOString() ||
          new Date().toISOString(),
      }));
      callback(documents);
    },
    (error) => {
      console.error("Error in real-time subscription:", error);
    }
  );
};

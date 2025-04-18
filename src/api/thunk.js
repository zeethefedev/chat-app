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

const messagesDb = collection(db, "messages");
const q = query(messagesDb, orderBy("timestamp", "asc"));

// Thunk for adding a message to Firestore with server timestamp
export const addMessage = createAsyncThunk(
  "firestore/addMessage",
  async (data, { rejectWithValue }) => {
    try {
      const newMessage = { ...data, timestamp: serverTimestamp() };
      const docRef = await addDoc(messagesDb, newMessage);
      return { id: docRef.id, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const getMessage = (doc) => {
  const data = doc.data();
  const timestamp =
    data.timestamp?.toDate?.().toISOString() || new Date().toISOString();

  return {
    id: doc.id,
    ...data,
    timestamp,
  };
};

// Thunk for fetching messages from Firestore
export const fetchMessages = createAsyncThunk(
  "firestore/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map((doc) => getMessage(doc));
      return messages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Function to subscribe to real-time message updates
export const subscribeToMessages = (callback) => {
  return onSnapshot(
    q,
    (snapshot) => handleSnapShotChange(snapshot, callback),
    (error) => {
      console.error("Error in real-time subscription:", error);
    }
  );
};

const handleSnapShotChange = (snapshot, callback) => {
  const messages = snapshot.docs.map((doc) => getMessage(doc));
  callback(messages);
};

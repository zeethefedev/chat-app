import React from 'react';
import { useDispatch } from "react-redux";
import { signInUser } from "../api/thunk";

function Welcome() {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    const email = "test@example.com"; // Replace with user input
    const password = "password123"; // Replace with user input
    dispatch(signInUser({ email, password }));
  };

  return (
    <div>
      <h1>Welcome to the Chat App</h1>
      <p>Please sign in to continue.</p>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default Welcome;
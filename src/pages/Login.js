import React from "react";
import LoginForm from "../components/login/LoginForm";

function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;

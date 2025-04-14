import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}

export default Login;

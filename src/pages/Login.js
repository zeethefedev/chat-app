import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../api/thunk";
import Input from "../components/generics/Input";
import Button from "../components/generics/Button";

function Login() {
  const [user, setUser] = useState([
    { name: "email", value: "" },
    { name: "password", value: "" },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.reducer);

  const handleLogin = async (event) => {
    event.preventDefault();

    const validForm = user.every((input) => input.value);

    if (validForm) {
      const email = user.find((input) => input.name === "email").value;
      const password = user.find((input) => input.name === "password").value;

      const result = await dispatch(signInUser({ email, password }));
      if (!result.error) {
        navigate("/chat");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newUser = user.map((input) =>
      input.name === name ? { ...input, value: value.trim() } : input
    );

    setUser(newUser);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {user.map((input) => (
            <Input
              name={input.name}
              type={input}
              placeholder={input.name}
              value={input.value}
              onChange={handleChange}
            />
          ))}
          <Button
            label={loading ? "Signing in..." : "Sign In"}
            onClick={handleLogin}
            style={{ width: "100%" }}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;

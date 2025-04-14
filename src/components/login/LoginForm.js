import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../generics/Input";
import Button from "../generics/Button";
import { signInUser } from "../../api/thunk";

function LoginForm({ onSuccess }) {
  const [user, setUser] = useState([
    { name: "email", value: "" },
    { name: "password", value: "" },
  ]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reducer);

  const handleLogin = async (event) => {
    event.preventDefault();

    const validForm = user.every((input) => input.value);

    if (validForm) {
      const email = user.find((input) => input.name === "email").value;
      const password = user.find((input) => input.name === "password").value;

      const result = await dispatch(signInUser({ email, password }));
      if (!result.error && onSuccess) {
        onSuccess();
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
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        {user.map((input) => (
          <Input
            key={input.name}
            name={input.name}
            type={input.name === "password" ? "password" : "text"}
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
    </>
  );
}

export default LoginForm;

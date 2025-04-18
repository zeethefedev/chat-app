import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../generics/Input";
import Button from "../generics/Button";
import ErrorMessage from "../generics/ErrorMessage";
import { signInUser } from "../../api/thunk";
import { useNavigate } from "react-router-dom";

const getDataField = (fields) => {
  const fieldArr = fields.map((field) => ({ name: field, value: "" }));
  return fieldArr;
};

function LoginForm() {
  const [user, setUser] = useState(getDataField(["name", "password"]));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.reducer);

  const handleLoginSuccess = () => {
    navigate("/chat");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const validForm = user.every((input) => input.value);

    if (validForm) {
      const email = user.find((input) => input.name === "email").value;
      const password = user.find((input) => input.name === "password").value;

      dispatch(signInUser({ email, password }))
        .unwrap()
        .then(() => handleLoginSuccess())
        .catch(() => {});
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
      <ErrorMessage message={error} className="mb-4" />
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

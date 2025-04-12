import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signInUser, signOutUser } from "../api/thunk";
import Button from "./generics/Button";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer);

  const navLinks = [
    { to: "/chat", label: "Chat" },
    { to: "/settings", label: "Settings" },
  ];

  const handleSignIn = async () => {
    const result = await dispatch(
      signInUser({
        email: "test@example.com",
        password: "password123",
      })
    );
    if (!result.error) {
      navigate("/chat");
    }
  };

  const handleSignOut = async () => {
    const result = await dispatch(signOutUser());
    if (!result.error) {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold transition-colors hover:text-blue-700"
          >
            Chat App
          </Link>
          <div className="flex items-center gap-4">
            {!user ? (
              <Button label="Sign In" onClick={handleSignIn} />
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                {/* <HelperButton onClick={() => setShowShortcuts(true)}/> */}
                <Button
                  label="Sign Out"
                  onClick={handleSignOut}
                  className="bg-transparent border border-solid"
                />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

function HelperButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded transition-colors"
      title="Show keyboard shortcuts (Press ?)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default Navbar;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signInUser, signOutUser } from "../api/thunk";
import { usePreferences } from "../hooks/usePreferences";
import Button from "./generics/Button";
import ShortcutsHelp from "./ShortcutsHelp";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer);
  const { preferences } = usePreferences();
  const [showShortcuts, setShowShortcuts] = useState(false);

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
      <nav
        className={`bg-white shadow-md py-4 ${
          preferences.theme === "dark" ? "dark bg-gray-800" : ""
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className={`
            text-xl font-bold transition-colors
            ${preferences.theme === "dark" ? "text-blue-400" : "text-blue-600"}
            hover:text-blue-700
          `}
          >
            Chat App
          </Link>
          <div className="flex items-center gap-4">
            {!user ? (
              <Button label="Sign In" onClick={handleSignIn} />
            ) : (
              <>
                <Link
                  to="/chat"
                  className={`
                    transition-colors
                    ${
                      preferences.theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                    }
                  `}
                >
                  Chat
                </Link>
                <Link
                  to="/settings"
                  className={`
                    transition-colors
                    ${
                      preferences.theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                    }
                  `}
                >
                  Settings
                </Link>
                <button
                  onClick={() => setShowShortcuts(true)}
                  className={`
                    p-2 rounded transition-colors
                    ${
                      preferences.theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }
                  `}
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
                <Button
                  label="Sign Out"
                  onClick={handleSignOut}
                  style={{
                    backgroundColor: "transparent",
                    color: preferences.theme === "dark" ? "#60A5FA" : "#3B82F6",
                    border: `1px solid ${
                      preferences.theme === "dark" ? "#60A5FA" : "#3B82F6"
                    }`,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </nav>
      <ShortcutsHelp
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </>
  );
}

export default Navbar;

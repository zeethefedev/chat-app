import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../api/thunk";
import Button from "../components/generics/Button";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.reducer);

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    dispatch(signOutUser())
      .unwrap()
      .then(() => navigate("/login"))
      .catch(() => {});
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Signing Out...
        </h2>
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
            <Button label="Try Again" onClick={handleLogout} />
            <Button
              label="Back to Home"
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "transparent",
                color: "#3B82F6",
                border: "1px solid #3B82F6",
                marginLeft: "8px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Logout;

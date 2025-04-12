import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/generics/Button";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white">
      <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="space-x-4">
        <Button label="Back to Home" onClick={() => navigate("/")} />
        <Button
          label="Contact Support"
          onClick={() => (window.location.href = "mailto:support@chatapp.com")}
          style={{
            backgroundColor: "transparent",
            color: "#3B82F6",
            border: "1px solid #3B82F6",
          }}
        />
      </div>
    </div>
  );
}

export default Error;

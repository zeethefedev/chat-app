import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Chat from "./pages/Chat";
import Error from "./pages/Error";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.reducer);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const { user } = useSelector((state) => state.reducer);

  return (
    // <ErrorBoundary>
    //   <div className={`
    //     min-h-screen transition-colors duration-200
    //     ${preferences.theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}
    //   `}>
    //     <Navbar />
    //     <Routes>
    //       <Route path="/" element={
    //         user ? <Navigate to="/chat" replace /> : <Welcome />
    //       } />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/login" element={
    //         user ? <Navigate to="/chat" replace /> : <Login />
    //       } />
    //       <Route path="/chat" element={
    //         <ProtectedRoute>
    //           <Chat />
    //         </ProtectedRoute>
    //       } />
    //       <Route path="/settings" element={
    //         <ProtectedRoute>
    //           <Settings />
    //         </ProtectedRoute>
    //       } />
    //       <Route path="/logout" element={<Logout />} />
    //       <Route path="*" element={<Error />} />
    //     </Routes>
    //     <ShortcutsHelp
    //       isOpen={showShortcuts}
    //       onClose={() => setShowShortcuts(false)}
    //     />
    //   </div>
    // </ErrorBoundary>
    <div className="min-h-screen transition-colors duration-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

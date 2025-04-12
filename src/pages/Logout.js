import React from 'react';

function Logout() {
  const handleLogout = () => {
    alert('Logged out successfully');
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
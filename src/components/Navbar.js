import React from 'react';

function Navbar() {
  const handleSignIn = () => {
    alert('Google Sign-In clicked');
  };

  const handleSignOut = () => {
    alert('Sign Out clicked');
  };

  return (
    <nav>
      <button onClick={handleSignIn}>Google Sign-In</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </nav>
  );
}

export default Navbar;
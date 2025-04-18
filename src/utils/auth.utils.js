export const getErrorMessage = (error) => {
  if (!error) return "An unknown error occurred";

  // Firebase auth error codes
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Invalid password";
    case "auth/email-already-in-use":
      return "This email is already registered";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/network-request-failed":
      return "Network error. Please check your connection";
    default:
      return error.message || "An error occurred";
  }
};

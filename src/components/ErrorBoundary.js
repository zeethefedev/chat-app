import React from "react";
import Button from "./generics/Button";
import { usePreferences } from "../hooks/usePreferences";

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log the error to your error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  handleReport = () => {
    const errorReport = {
      error: this.state.error?.toString(),
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    // You can implement your error reporting logic here
    console.log("Error Report:", errorReport);
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorUI
          error={this.state.error}
          onReset={this.handleReset}
          onReport={this.handleReport}
        />
      );
    }

    return this.props.children;
  }
}

// Separate UI component to use hooks
function ErrorUI({ error, onReset, onReport }) {
  const { preferences } = usePreferences();
  const isDark = preferences.theme === "dark";

  return (
    <div
      className={`
      min-h-screen flex flex-col items-center justify-center p-4
      ${
        isDark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-red-50 to-white"
      }
    `}
    >
      <div className="max-w-md text-center">
        <div
          className={`
          p-4 rounded-lg mb-6
          ${isDark ? "bg-gray-800" : "bg-white shadow-lg"}
        `}
        >
          <h1
            className={`
            text-2xl font-bold mb-4
            ${isDark ? "text-red-400" : "text-red-600"}
          `}
          >
            Oops! Something went wrong
          </h1>
          <p
            className={`
            mb-4
            ${isDark ? "text-gray-300" : "text-gray-600"}
          `}
          >
            We're sorry for the inconvenience. The error has been logged and
            we'll look into it.
          </p>
          {error && (
            <div
              className={`
              text-left p-3 rounded mb-4 font-mono text-sm
              ${
                isDark
                  ? "bg-gray-900 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }
            `}
            >
              {error.toString()}
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button label="Return Home" onClick={onReset} />
          <Button
            label="Report Issue"
            onClick={onReport}
            style={{
              backgroundColor: "transparent",
              color: isDark ? "#60A5FA" : "#3B82F6",
              border: `1px solid ${isDark ? "#60A5FA" : "#3B82F6"}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Wrap the class component to provide preferences context
function ErrorBoundary(props) {
  return <ErrorBoundaryClass {...props} />;
}

export default ErrorBoundary;

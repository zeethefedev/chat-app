module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "chat-blue": "#3B82F6",
        "chat-gray": "#F3F4F6",
      },
      spacing: {
        128: "32rem",
      },
      maxHeight: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};

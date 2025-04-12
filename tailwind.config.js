module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'chat-blue': '#3B82F6',
        'chat-gray': '#F3F4F6',
        'dark': {
          'primary': '#1F2937',
          'secondary': '#374151',
          'accent': '#60A5FA'
        }
      },
      spacing: {
        '128': '32rem',
      },
      maxHeight: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
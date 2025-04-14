export const getFontSize = (preferences) => {
  switch (preferences.fontSize) {
    case "small":
      return "text-sm";
    case "large":
      return "text-lg";
    default:
      return "text-base";
  }
};

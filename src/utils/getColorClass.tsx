// Determine the color based on the word count
export const getColorClass = (wordCount: number) => {
  if (wordCount >= 750) {
    return "text-green-500";
  } else if (wordCount >= 500) {
    return "text-yellow-500";
  } else {
    return "text-pink";
  }
};

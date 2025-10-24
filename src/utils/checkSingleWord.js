const checkSingleWord = (text) => {
  const textArray = text.trim().split(" ");

  if (textArray.length > 1) {
    return {
      message: null,
    };
  }

  return {
    message: "ok",
    word: textArray[0],
  };
};

export { checkSingleWord };

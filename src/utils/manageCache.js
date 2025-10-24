let map = new Map();

const hasWordInCache = (word) => {
  const isExist = map.has(word);

  if (isExist) {
    return map.get(word);
  }

  return false;
};

const storeInCache = (word, definition) => {
  map.set(word, definition);
};

export { hasWordInCache, storeInCache };

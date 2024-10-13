const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = '#' + (hash & 0x00ffffff).toString(16).padStart(6, '0');
  return color;
};

export { stringToColor };

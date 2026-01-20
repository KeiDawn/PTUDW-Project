export const saveGame = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadGame = (key) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};

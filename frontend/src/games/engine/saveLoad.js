const KEY_PREFIX = 'ptudw_game_';

export const saveGame = (gameCode, data) => {
  localStorage.setItem(
    KEY_PREFIX + gameCode,
    JSON.stringify(data)
  );
};

export const loadGame = (gameCode) => {
  const raw = localStorage.getItem(KEY_PREFIX + gameCode);
  return raw ? JSON.parse(raw) : null;
};

export const hasSavedGame = (gameCode) => {
  return !!localStorage.getItem(KEY_PREFIX + gameCode);
};

export const clearSavedGame = (gameCode) => {
  localStorage.removeItem(KEY_PREFIX + gameCode);
};

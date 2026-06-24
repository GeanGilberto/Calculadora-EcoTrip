import { HISTORY_LIMIT, STORAGE_KEYS } from "./constants.js";

export function getHistory() {
  return readJson(STORAGE_KEYS.history, []);
}

export function saveHistoryItem(item) {
  const history = getHistory();
  const nextHistory = [item, ...history].slice(0, HISTORY_LIMIT);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(nextHistory));
  return nextHistory;
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEYS.history);
}

export function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme);
}

export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

import type { StoredAccount } from './types';

const STORAGE_KEY = 'farming-game-accounts';

export function getStoredAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredAccount[];
  } catch {
    return [];
  }
}

export function saveAccount(username: string, token: string): void {
  const accounts = getStoredAccounts();
  const existing = accounts.findIndex((a) => a.username === username);
  if (existing >= 0) {
    accounts[existing].token = token;
  } else {
    accounts.push({ username, token });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function removeAccount(username: string): void {
  const accounts = getStoredAccounts().filter((a) => a.username !== username);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

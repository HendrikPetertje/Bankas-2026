import { useState } from 'react';
import { getStoredAccounts, removeAccount, saveAccount } from './accounts';
import { AuthExpiredError, getMyFarm, login, signUp } from './api';
import LoadingOverlay from './LoadingOverlay';
import type { Garden, StoredAccount } from './types';

interface LoginFrameProps {
  onAuthenticated: (token: string, garden: Garden, username: string) => void;
  onError: (msg: string) => void;
}

export default function LoginFrame({ onAuthenticated, onError }: LoginFrameProps) {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const savedAccounts = getStoredAccounts();

  async function handleLogin(isSignUp: boolean) {
    if (username.length < 6 || pin.length !== 6) {
      onError('Användarnamn (minst 6 tecken) och PIN (6 siffror) krävs.');
      return;
    }
    setLoading(true);
    try {
      const res = isSignUp ? await signUp(username.trim(), pin) : await login(username.trim(), pin);
      saveAccount(res.garden.user_name, res.token);
      onAuthenticated(res.token, res.garden, res.garden.user_name);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Något gick fel.';
      onError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectAccount(account: StoredAccount) {
    setLoading(true);
    try {
      const res = await getMyFarm(account.token);
      onAuthenticated(account.token, res.garden, account.username);
    } catch (err: unknown) {
      if (err instanceof AuthExpiredError) {
        removeAccount(account.username);
        onError('Sessionen har gått ut. Logga in igen.');
      } else {
        const msg = err instanceof Error ? err.message : 'Något gick fel.';
        onError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6">
      {/* Saved accounts section */}
      <div className="w-full max-w-xs">
        <h3 className="font-display text-base text-text mb-2">Välj Konto</h3>
        {savedAccounts.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {savedAccounts.map((account) => (
              <li key={account.username}>
                <button
                  type="button"
                  className="w-full rounded-lg bg-pine px-4 py-2.5 font-body text-sm font-bold text-white cursor-pointer border-0 hover:opacity-85 transition-opacity"
                  onClick={() => handleSelectAccount(account).catch(() => {})}
                >
                  {account.username}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-body text-sm text-muted italic">Inga konton sparade än.</p>
        )}
      </div>

      {/* Divider */}
      <p className="font-body text-sm text-subtle">Eller</p>

      {/* Login form */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <input
          type="text"
          placeholder="Användarnamn (minst 6 tecken)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-highlight-med bg-surface px-4 py-2 font-body text-text placeholder:text-muted"
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          placeholder="PIN (6 siffror)"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="rounded-lg border border-highlight-med bg-surface px-4 py-2 font-body text-text placeholder:text-muted"
        />
        <div className="flex gap-3 justify-center mt-2">
          <button
            type="button"
            onClick={() => handleLogin(false).catch(() => {})}
            className="rounded-lg bg-pine px-5 py-2.5 font-body text-sm font-bold text-white cursor-pointer border-0 hover:opacity-85 transition-opacity"
          >
            Logga in
          </button>
          <button
            type="button"
            onClick={() => handleLogin(true).catch(() => {})}
            className="rounded-lg bg-foam px-5 py-2.5 font-body text-sm font-bold text-white cursor-pointer border-0 hover:opacity-85 transition-opacity"
          >
            Skapa ny Gård
          </button>
        </div>
      </div>
    </div>
  );
}

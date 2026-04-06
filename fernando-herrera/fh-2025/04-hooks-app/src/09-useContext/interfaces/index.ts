import type { User } from "../data/user.data";

export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

export interface UserContextProps {
  authStatus: AuthStatus;
  isAuthenticated: boolean;
  user: User | null;
  login: (user_id: number) => boolean;
  logout: () => void;
}
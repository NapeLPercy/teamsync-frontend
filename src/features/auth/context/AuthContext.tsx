import {
  createContext,
  useState,
  type ReactNode,
} from 'react';

export interface User {
  userId: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = 'teamsync_user';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (user: User) => {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setUserState(user);
  };

  const logout = () => {
    sessionStorage.removeItem(USER_STORAGE_KEY);
    setUserState(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
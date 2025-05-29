import { createContext, useEffect, useState, ReactNode } from 'react';
import { Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Use the built-in useSession hook instead of manually fetching the session
  const { data: sessionData, status } = useSession();
  const [loading, setLoading] = useState(status === 'loading');
  
  // Debug logs
  console.log('AuthProvider - session status:', status);
  console.log('AuthProvider - sessionData:', sessionData);
  
  // Update loading state when session status changes
  useEffect(() => {
    console.log('AuthProvider - status changed to:', status);
    console.log('AuthProvider - new sessionData:', sessionData);
    setLoading(status === 'loading');
  }, [status, sessionData]);

  const handleSignIn = async (provider = 'google') => {
    setLoading(true);
    await signIn(provider, { callbackUrl: '/' });
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  // Determine authentication state based on the presence of user data in the session
  const isAuthenticated = !!sessionData?.user;
  console.log('AuthContext - Final isAuthenticated state:', isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        session: sessionData,
        loading,
        isAuthenticated,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

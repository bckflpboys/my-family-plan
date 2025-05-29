import { ReactNode, useEffect } from 'react';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

// Mock authentication state - explicitly set to false
const mockAuthState = {
  isAuthenticated: false
};

// Reset authentication state to ensure it starts as false
mockAuthState.isAuthenticated = false;

// Create a flag to track if we've explicitly signed in
let hasExplicitlySignedIn = false;

// Monkey patch fetch to intercept NextAuth API calls
const originalFetch = window.fetch;
window.fetch = function (input, init) {
  const url = input instanceof Request ? input.url : String(input);
  
  // Intercept all NextAuth API calls
  if (url.includes('/api/auth/')) {
    // For session endpoint, return mock session based on authentication state
    if (url.includes('/api/auth/session')) {
      console.log('Intercepted session request, auth state:', mockAuthState.isAuthenticated);
      // Only return a session if we've explicitly signed in
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(hasExplicitlySignedIn ? mockSession : { user: null }),
        headers: new Headers({ 'content-type': 'application/json' }),
        status: 200,
      } as Response);
    }
    
    // For CSRF endpoint, return a mock CSRF token
    if (url.includes('/api/auth/csrf')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ csrfToken: 'mock-csrf-token-' + Date.now() }),
        headers: new Headers({ 'content-type': 'application/json' }),
        status: 200,
      } as Response);
    }
    
    // For signin endpoint, set authentication state to true and return success
    if (url.includes('/api/auth/signin')) {
      mockAuthState.isAuthenticated = true;
      hasExplicitlySignedIn = true; // Mark that we've explicitly signed in
      console.log('User signed in, setting hasExplicitlySignedIn to true');
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ url: '/' }),
        headers: new Headers({ 'content-type': 'application/json' }),
        status: 200,
      } as Response);
    }
    
    // For signout endpoint, set authentication state to false and return success
    if (url.includes('/api/auth/signout')) {
      mockAuthState.isAuthenticated = false;
      hasExplicitlySignedIn = false; // Reset the explicit sign-in flag
      console.log('User signed out, setting hasExplicitlySignedIn to false');
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ url: '/' }),
        headers: new Headers({ 'content-type': 'application/json' }),
        status: 200,
      } as Response);
    }
  }
  
  // Pass through all other requests
  return originalFetch(input, init);
};

interface SessionProviderProps {
  children: ReactNode;
}

// Create a mock session for client-only mode
const mockSession = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  user: {
    name: 'Demo User',
    email: 'demo@example.com',
    image: null,
    id: 'mock-user-id'
  }
};

export function SessionProvider({ children }: SessionProviderProps) {
  // Log the authentication state on component mount
  useEffect(() => {
    console.log('SessionProvider mounted, auth state:', mockAuthState.isAuthenticated);
    // Reset authentication state to false on component mount
    mockAuthState.isAuthenticated = false;
    console.log('Authentication state reset to false');
  }, []);
  // Fix for the sendBeacon issue
  useEffect(() => {
    const originalSendBeacon = navigator.sendBeacon;
    navigator.sendBeacon = function(url, data) {
      // Convert URL to string to safely use includes
      const urlString = url.toString();
      
      if (urlString.includes('/api/auth/')) {
        // Intercept NextAuth beacon calls and just return success
        return true;
      }
      // Pass through other beacon calls
      return originalSendBeacon.call(navigator, url, data);
    };
    
    // Cleanup when component unmounts
    return () => {
      navigator.sendBeacon = originalSendBeacon;
    };
  }, []);
  
  // Log the current auth state before rendering
  console.log('SessionProvider rendering, current auth state:', mockAuthState.isAuthenticated);
  
  return (
    <NextAuthSessionProvider 
      session={mockAuthState.isAuthenticated ? mockSession : null}
      // Fix for URL parsing error - ensure baseUrl is correctly formatted
      basePath={`${window.location.origin}/api/auth`}
      // These settings help minimize API calls, though our fetch/beacon patches will intercept them
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </NextAuthSessionProvider>
  );
}

export default SessionProvider;

import {createContext, useState } from 'react';

export const UserContext = createContext({ contextToken: '', auth: false });

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ authToken: '', auth: false });

  // Login updates the user data with a name parameter
  const login = (authToken) => {
    setUser((user) => ({
      authToken: authToken,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      authToken: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
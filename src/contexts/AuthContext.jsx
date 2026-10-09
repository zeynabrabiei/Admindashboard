import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('');

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("adminData");
    return stored ? JSON.parse(stored) : { username: "admin", password: "1234" };
  });

  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify(userData));
  }, [userData]);

  const login = (username) => {
    setIsLoggedIn(true);
    setAdminName(username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAdminName('');
  };

  const updateCredentials = (newUsername, newPassword) => {
    setUserData({ username: newUsername, password: newPassword });
    setAdminName(newUsername);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, adminName, login, logout, userData, updateCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
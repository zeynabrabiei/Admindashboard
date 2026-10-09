import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const DEFAULT_CREDENTIALS = {
  username: "admin",
  password: "1234",
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(() =>
    readStorage("adminData", DEFAULT_CREDENTIALS)
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("adminSession") === "true"
  );

  const [adminName, setAdminName] = useState(() =>
    localStorage.getItem("adminName") || ""
  );

  useEffect(() => {
    try {
      localStorage.setItem("adminData", JSON.stringify(userData));
    } catch (error) {
      console.error("Unable to save admin settings:", error);
    }
  }, [userData]);

  const login = useCallback((username) => {
    setIsLoggedIn(true);
    setAdminName(username);

    try {
      localStorage.setItem("adminSession", "true");
      localStorage.setItem("adminName", username);
    } catch (error) {
      console.error("Unable to save login session:", error);
    }
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setAdminName("");

    try {
      localStorage.removeItem("adminSession");
      localStorage.removeItem("adminName");
    } catch (error) {
      console.error("Unable to clear login session:", error);
    }
  }, []);

  const updateCredentials = useCallback((newUsername, newPassword) => {
    const updatedUser = {
      username: newUsername.trim(),
      password: newPassword,
    };

    setUserData(updatedUser);
    setAdminName(updatedUser.username);

    try {
      localStorage.setItem("adminName", updatedUser.username);
    } catch (error) {
      console.error("Unable to save admin name:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        adminName,
        userData,
        login,
        logout,
        updateCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
import { createContext, useContext, useState, useCallback } from "react";

const AdminContext = createContext(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside <AdminProvider>");
  return ctx;
};

const SESSION_KEY = "fh_admin_session";
const NAME_KEY    = "fh_owner_name";
// Password is read from env at runtime; overrides stored in localStorage
const PW_KEY      = "fh_admin_pw_override";

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === "true"; }
    catch { return false; }
  });

  const [ownerName, setOwnerName] = useState(() => {
    try { return localStorage.getItem(NAME_KEY) || "Joe"; }
    catch { return "Joe"; }
  });

  // Resolve current password: localStorage override takes priority over .env
  const getActivePassword = () => {
    try {
      return localStorage.getItem(PW_KEY) || import.meta.env.VITE_ADMIN_PASSWORD || "admin1234";
    } catch {
      return import.meta.env.VITE_ADMIN_PASSWORD || "admin1234";
    }
  };

  const adminLogin = useCallback((password) => {
    const correct = getActivePassword();
    if (password === correct) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const updateOwnerName = useCallback((name) => {
    const trimmed = name.trim() || "Joe";
    localStorage.setItem(NAME_KEY, trimmed);
    setOwnerName(trimmed);
  }, []);

  /** Returns { success, error } */
  const updateAdminPassword = useCallback((currentPw, newPw) => {
    const correct = getActivePassword();
    if (currentPw !== correct) return { success: false, error: "Current password is incorrect." };
    if (newPw.length < 6)       return { success: false, error: "New password must be at least 6 characters." };
    try {
      localStorage.setItem(PW_KEY, newPw);
      return { success: true };
    } catch {
      return { success: false, error: "Failed to save password." };
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout, ownerName, updateOwnerName, updateAdminPassword }}>
      {children}
    </AdminContext.Provider>
  );
};

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/config";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  // Used by Login/Signup to know a Google redirect is in progress
  const [redirectPending, setRedirectPending] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  // Hint Google to show account chooser
  googleProvider.setCustomParameters({ prompt: "select_account" });

  // ── Handle Google redirect result on app load ─────────────────
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (!result) return; // No redirect pending — normal load
        const user = result.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          // New Google user — write Firestore profile
          // We don't know which role they intended; default to customer
          // (they can be upgraded to admin in Firebase console)
          const intendedRole = sessionStorage.getItem("googleSignInRole") || "customer";
          sessionStorage.removeItem("googleSignInRole");
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName || user.email.split("@")[0],
            email: user.email,
            role: intendedRole,
            photoURL: user.photoURL || "",
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            addresses: [],
            wishlist: [],
            orderHistory: [],
          });
        } else {
          await updateDoc(doc(db, "users", user.uid), {
            lastLogin: serverTimestamp(),
          });
        }
      })
      .catch((error) => {
        console.error("Google redirect error:", error);
      });
  }, []);

  // ── Sign Up ──────────────────────────────────────────────────
  const signup = async (name, email, password, role = "customer") => {
    setAuthLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });

      const profileData = {
        name,
        email,
        role,
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        addresses: [],
        wishlist: [],
        orderHistory: [],
      };

      await setDoc(doc(db, "users", user.uid), profileData);

      // Immediately set local state so onAuthStateChanged doesn't override
      // with a "customer" default before Firestore commits the new doc
      setUserRole(role);
      setUserProfile(profileData);

      return { success: true, user };
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // ── Log In ───────────────────────────────────────────────────
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // ── Google Sign In (redirect-based — works in all browsers) ───
  const signInWithGoogle = async (role = "customer") => {
    // Store the intended role in sessionStorage — persists through redirect
    sessionStorage.setItem("googleSignInRole", role);
    setRedirectPending(true);
    await signInWithRedirect(auth, googleProvider);
    // Function doesn't return — browser will navigate away
  };

  // ── Update Profile ─────────────────────────────────────────────
  const updateProfileData = async (updates) => {
    if (!currentUser) return { success: false, error: "No user logged in" };
    try {
      if (updates.displayName || updates.name) {
        await updateProfile(currentUser, {
          displayName: updates.displayName || updates.name,
        });
      }
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { ...updates, updatedAt: serverTimestamp() });
      setUserProfile((prev) => ({ ...prev, ...updates }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ── Change Password ────────────────────────────────────────────
  const changePassword = async (currentPassword, newPassword) => {
    if (!currentUser) return { success: false, error: "No user logged in" };
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ── Upload Profile Photo ───────────────────────────────────────
  const uploadProfilePhoto = async (file) => {
    if (!currentUser) return { success: false, error: "No user logged in" };
    try {
      const storageRef = ref(storage, `profile-photos/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      await updateProfile(currentUser, { photoURL });
      await updateDoc(doc(db, "users", currentUser.uid), {
        photoURL,
        updatedAt: serverTimestamp(),
      });
      setUserProfile((prev) => ({ ...prev, photoURL }));
      return { success: true, photoURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ── Log Out ──────────────────────────────────────────────────
  const logout = () => signOut(auth);

  // ── Auth State Listener ──────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const snap = await getDoc(doc(db, "users", user.uid));
          if (snap.exists()) {
            const data = snap.data();
            setUserRole(data.role || "customer");
            setUserProfile(data);
          } else {
            setUserRole("customer");
            setUserProfile(null);
          }
        } catch {
          setUserRole("customer");
          setUserProfile(null);
        }
      } else {
        setUserRole(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    userRole,
    userProfile,
    loading,
    authLoading,
    redirectPending,
    isAdmin: userRole === "admin",
    isCustomer: userRole === "customer",
    signup,
    login,
    signInWithGoogle,
    updateProfile: updateProfileData,
    changePassword,
    uploadProfilePhoto,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

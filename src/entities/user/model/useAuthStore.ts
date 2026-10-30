import { create } from "zustand";
import placeholder from "@/shared/assets/currentuser-placeholders-array/exited.png";
import { refreshToken } from "@/shared/api/refreshToken";
import { deleteToken } from "@/shared/api/deleteToken";
const API_URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

interface UserData {
  userName?: string;
  userPic?: string;
  userIsLogged?: boolean;
}

interface useAuthStore {
  userName: string;
  uploadedUserpic: string;
  userPic: string;
  authorization: (username?: string, userpic?: string) => void;
  setUserpic: (url: string) => void;
  authCheck: () => void;
  anonymous: () => void;
  userIsLogged: boolean;
  userIsAdmin: boolean;
  isUserLoggining: boolean;
  admin: () => Promise<void>;
  currentUserId: string | null;
  adminAuthCheck: () => void;
}

export const useAuthStore = create<useAuthStore>((set) => ({
  currentUserId: null,
  uploadedUserpic: "",
  userName: "",
  userPic: "",
  userIsLogged: false,
  userIsAdmin: false,
  isUserLoggining: false,

  authorization: (username, userpic) => {
    set({ userName: username, userPic: userpic, userIsLogged: true });
    const userAuthorization: UserData = {
      userName: username,
      userPic: userpic,
      userIsLogged: true,
    };

    try {
      localStorage.setItem("userdata", JSON.stringify(userAuthorization));
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "localStorage is full",
      );
    }
  },

  setUserpic: (url: string) => {
    set({ userPic: url });
  },

  authCheck: () => {
    const savedData = localStorage.getItem("userdata");
    if (!savedData) return false;
    try {
      set({isUserLoggining: true})
      const dataParse = JSON.parse(savedData) as UserData;
      set({
        userName: dataParse.userName || "",
        userPic: dataParse.userPic || "",
        userIsLogged: dataParse.userIsLogged,
        isUserLoggining: false
      });
      return true;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "invalid JSON");
      localStorage.removeItem("userdata");
      set({isUserLoggining: false})
      return false;
    }
  },

  adminAuthCheck: () => {
    set({isUserLoggining: true})
    const currentUser = localStorage.getItem("current_user_id")
    if (!currentUser) return false
    try {
      if (currentUser) {
        set({currentUserId: currentUser, isUserLoggining: false})
        return true
      }
    } catch (error) {
      set({isUserLoggining: false})
      console.error(error instanceof Error ? error.message : "invalid JSON")
      localStorage.removeItem("current_user_id")
      return false
    }
    
  },

  anonymous: () => {
    const guestData: UserData = {
      userName: "Гость",
      userPic: placeholder,
      userIsLogged: true,
    }
    set({
      userName: "Гость",
      userPic: placeholder,
      userIsLogged: true
    })
    localStorage.setItem('userdata', JSON.stringify(guestData))
  },

  admin: async () => {
    try {
      set({ isUserLoggining: true });
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) return;

      const response = await fetch(`${API_URL}/auth/v1/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=representation",
          apikey: API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 403) {
        deleteToken();
        set({ userIsAdmin: false, isUserLoggining: false });
      }

      if (response.status === 401) {
        const refresh = await refreshToken();
        if (refresh === false) {
          deleteToken();
          set({ userIsAdmin: false, isUserLoggining: false });
        }
        if (refresh === true) {
          set({ userIsAdmin: true, isUserLoggining: false });
        }
      }

      if (response.ok) {
        set({ userIsAdmin: true, isUserLoggining: false });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

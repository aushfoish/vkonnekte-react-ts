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
  admin: () => void;
}

export const useAuthStore = create<useAuthStore>((set) => ({
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
      const dataParse = JSON.parse(savedData) as UserData;
      set({
        userName: dataParse.userName || "",
        userPic: dataParse.userPic || "",
        userIsLogged: dataParse.userIsLogged,
      });
      return true;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "invalid JSON");
      localStorage.removeItem("userdata");
      return false;
    }
  },

  anonymous: () => {
    set({
      userName: "не авторизовался",
      userPic: placeholder,
      userIsLogged: false,
    });
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
        deleteToken()
        set({userIsAdmin: false, isUserLoggining: false})
      }

      if (response.status === 401) {
        const refresh = await refreshToken();
        if (refresh === false) {
          deleteToken()
          set({ userIsAdmin: false, isUserLoggining: false})
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

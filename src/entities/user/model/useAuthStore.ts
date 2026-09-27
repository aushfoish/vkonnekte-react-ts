import { create } from "zustand";
import placeholder from "@/shared/assets/currentuser-placeholders-array/exited.png";

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
  admin: () => void
}

export const useAuthStore = create<useAuthStore>((set) => ({
  uploadedUserpic: "",
  userName: "",
  userPic: "",
  userIsLogged: false,
  userIsAdmin: false,

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
      console.error(
        error instanceof Error ? error.message : "invalid JSON"
      )
      localStorage.removeItem("userdata")
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

  admin: () => {
    const adminToken = localStorage.getItem('access_token')
    if (adminToken) {
      set({userIsAdmin: true})
    } else {
      set({userIsAdmin: false})
    }
  }
}));

import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { UserPage } from "@/pages/profile";
import { MainLayout } from "@/widgets/layouts";
import { RootRedirect } from "@/app/RootRedirect";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <RootRedirect /> },
      { path: "profile/:userId", element: <UserPage /> },
      {
        path: "my-audio",
        lazy: async () => {
          const { AudioPage } = await import("@/pages/music/ui/AudioPage");
          return { Component: AudioPage };
        },
      },
      {
        path: "admin",
        lazy: async () => {
          const { AdminPage } = await import("@/pages/admin/ui/AdminPage");
          return { Component: AdminPage };
        },
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

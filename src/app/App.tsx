import "./App.css";
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";


import { UserPage } from "@/pages/profile";
import { MainLayout } from "@/widgets/layouts";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="my-page" replace /> },
      { path: "my-page", element: <UserPage /> },
      { 
        path: "my-audio", 
        lazy: async () => {
          const {AudioPage} = await import("@/pages/music/ui/AudioPage")
          return {Component: AudioPage}
        }
      },
      { 
        path: "admin", 
        lazy: async () => {
          const {AdminPage} = await import("@/pages/admin/ui/AdminPage")
          return {Component: AdminPage}
        }
      }
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
}


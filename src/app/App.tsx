import "./App.css";
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";


import { UserPage } from "@/pages/profile";
import { AudioPage } from "@/pages/music";
import { MainLayout } from "@/widgets/layouts";
import { SkeletonMainPage } from "@/shared/ui";
import { AdminPage } from "@/pages/admin";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="my-page" replace /> },
      { path: "my-page", element: <UserPage /> },
      { path: "my-audio", element: <AudioPage /> },
      { path: "test", element: <SkeletonMainPage /> },
      { path: "admin", element: <AdminPage />}
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
}


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import LoginPage from "./components/pages/login";
import CacheProvider from "./lib/Cache";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CacheProvider>
      <RouterProvider router={router} />
    </CacheProvider>
  </StrictMode>
);

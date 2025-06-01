import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import LoginPage from "./components/pages/login";
import CacheProvider from "./lib/Cache";
import { AuthProvider } from "./context/authContext";
import SearchResults from "./components/pages/SearchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/search-results",
    element: <SearchResults />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CacheProvider>
      <RouterProvider router={router} />
    </CacheProvider>
  </AuthProvider>
);

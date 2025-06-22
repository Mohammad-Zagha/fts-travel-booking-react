import { createRoot } from "react-dom/client";
import "./index.css";

import CacheProvider from "./lib/Cache";
import { AuthProvider } from "./context/authContext";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <CacheProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </CacheProvider>
    </AuthProvider>
  </BrowserRouter>
);

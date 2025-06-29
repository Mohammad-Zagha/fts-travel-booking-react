import { createRoot } from "react-dom/client";
import "./index.css";

import CacheProvider from "./lib/Cache";
import { AuthProvider } from "./context/authContext";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";
import CartProvider from "./context/cartContext";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <CacheProvider>
          <Layout>
            <AppRoutes />
            <Toaster
              position="top-center"
              richColors
              visibleToasts={6}
              closeButton
              toastOptions={{
                closeButton: true,
              }}
              duration={3000}
            />
          </Layout>
        </CacheProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

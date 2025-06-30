import { Routes, Route } from "react-router";
import App from "./App";
import LoginPage from "./components/pages/login";
import SearchResults from "./components/pages/SearchResults";
import { HotelPage } from "./components/pages/HotelPage";
import CheckoutPage from "./components/pages/checkout";
import PublicRoute from "./components/publicRoutes";
import ProtectedLayout from "./context/protectedLayout";
import HomeRoute from "./components/homeRoute";
import AdminDashboard from "./components/pages/admin";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }
    />

    <Route
      path="/"
      element={
        <HomeRoute>
          <App />
        </HomeRoute>
      }
    />
    {/* Protected routes */}
    <Route element={<ProtectedLayout requiredRole="User" />}>
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/hotel/:id" element={<HotelPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Route>
    <Route element={<ProtectedLayout requiredRole="Admin" />}>
      <Route path="/admin" element={<AdminDashboard />} />
    </Route>
  </Routes>
);

export default AppRoutes;

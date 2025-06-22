import { Routes, Route } from "react-router";
import App from "./App";
import LoginPage from "./components/pages/login";
import SearchResults from "./components/pages/SearchResults";
import { HotelPage } from "./components/pages/HotelPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/hotel/:id" element={<HotelPage />} />
    </Routes>
  );
};

export default AppRoutes;

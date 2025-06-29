import { NavLink } from "react-router";
import { useAuth } from "../context/authContext";
import { LogOut } from "lucide-react";
import CartSheet from "./ui/CartSheet";

const Navbar = () => {
  const { isAuthenticated, logout, userInfo } = useAuth();

  return (
    <div className="w-full p-4 fixed top-0 z-[100] bg-transparent flex justify-between items-center">
      <NavLink
        to="/"
        className="text-primary text-2xl font-bold text-shadow-sm"
      >
        Traverce
      </NavLink>

      <div className="max-sm:hidden flex gap-10 px-8 py-3 rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-sm">
        {["Home", "Destinations", "Review", "Contact"].map((item) => (
          <span
            key={item}
            className="text-white text-sm font-semibold text-shadow-sm hover:text-primary transition-colors"
          >
            {item}
          </span>
        ))}
      </div>

      {!isAuthenticated ? (
        <NavLink
          to={{
            pathname: "/login",
          }}
          className="px-4 h-10 flex justify-center text-sm items-center text-white font-bold rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 shadow-sm"
        >
          Login
        </NavLink>
      ) : (
        <div className="flex items-center gap-3">
          <CartSheet />
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 h-10 text-sm font-semibold text-white rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 shadow-sm hover:bg-black/30 transition-colors"
          >
            {userInfo?.given_name}
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

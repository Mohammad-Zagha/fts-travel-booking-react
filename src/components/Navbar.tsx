import { NavLink } from "react-router";
import { useAuth } from "../context/authContext";
import { LogOut } from "lucide-react";
import CartSheet from "./ui/CartSheet";

const Navbar = () => {
  const { isAuthenticated, logout, userInfo } = useAuth();

  // Hide entire navbar if role is admin
  if (userInfo?.userType === "Admin") {
    return null;
  }

  const navItems = ["Home", "Destinations", "Review", "Contact"];

  const baseButtonStyles =
    "px-4 h-10 flex justify-center items-center text-sm font-semibold rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 shadow-sm";

  const renderNavLinks = () => (
    <div className="max-sm:hidden flex gap-10 px-8 py-3 rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-sm">
      {navItems.map((item) => (
        <span
          key={item}
          className="text-white text-sm font-semibold text-shadow-sm hover:text-primary transition-colors"
        >
          {item}
        </span>
      ))}
    </div>
  );

  const renderAuthButtons = () => {
    if (!isAuthenticated) {
      return (
        <NavLink
          to="/login"
          className={`${baseButtonStyles} text-white font-bold`}
        >
          Login
        </NavLink>
      );
    }

    return (
      <div className="flex items-center gap-3">
        {userInfo?.userType === "User" && <CartSheet />}
        <button
          onClick={logout}
          className={`${baseButtonStyles} text-white hover:bg-black/30 transition-colors`}
        >
          {userInfo?.given_name}
          <LogOut className="w-5 h-5 ml-2" />
        </button>
      </div>
    );
  };

  return (
    <div className="w-full p-4 fixed top-0 z-[100] bg-transparent flex justify-between items-center">
      <NavLink
        to="/"
        className="text-primary text-2xl font-bold text-shadow-sm"
      >
        Traverce
      </NavLink>

      {userInfo?.userType === "User" && renderNavLinks()}

      {renderAuthButtons()}
    </div>
  );
};

export default Navbar;

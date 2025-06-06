import { Link } from "react-router";
import { useAuth } from "../context/authContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout, userInfo } = useAuth();

  return (
    <div className="w-full p-4 fixed top-0 z-[100] bg-transparent flex justify-between items-center">
      <span className="text-primary text-2xl font-bold text-shadow-sm">
        Traverce
      </span>

      <div className="flex gap-10 px-8 py-3 rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-sm">
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
        <Link
          to="/login"
          className="px-4 h-10 flex justify-center text-sm items-center text-white font-bold rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 shadow-sm"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 h-10 text-sm font-semibold text-white rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 shadow-sm hover:bg-black/30 transition-colors"
        >
          {userInfo?.given_name}
          <LogOut className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Navbar;

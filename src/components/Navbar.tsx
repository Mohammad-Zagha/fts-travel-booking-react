import { Link } from "react-router";
import { useAuth } from "../context/authContext";
import { useUserInfo } from "../hooks/useGetUser";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { data: user } = useUserInfo();
  return (
    <div className="w-full p-2 fixed top-0 z-[100] bg-transparent flex justify-between">
      <span className="text-primary text-2xl font-bold text-shadow-sm">
        Traverce
      </span>
      <div className="flex gap-10 px-8 py-3 rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-sm">
        <span className="text-white text-sm font-semibold text-shadow-sm">
          Home
        </span>
        <span className="text-white text-sm font-semibold text-shadow-sm">
          Destinations
        </span>
        <span className="text-white text-sm font-semibold text-shadow-sm">
          Review
        </span>
        <span className="text-white text-sm font-semibold text-shadow-sm">
          Contact
        </span>
      </div>
      {!isAuthenticated ? (
        <Link
          to="/login"
          className="px-4 h-10 flex justify-center text-sm items-center text-white font-bold rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150  shadow-sm"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={logout}
          className="px-4 cursor-pointer h-10 flex justify-center text-sm items-center text-white font-bold rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150  shadow-sm"
        >
          {user?.given_name}
        </button>
      )}
    </div>
  );
};

export default Navbar;

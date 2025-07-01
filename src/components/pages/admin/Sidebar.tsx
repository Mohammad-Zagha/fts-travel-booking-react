import { useState } from "react";
import { Building2, Hotel, Bed, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "../../ui/Avatar";
import { useAuth } from "../../../context/authContext";

// Mock hook for demonstration

const Sidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { userInfo, logout } = useAuth();
  const navItems = [
    { id: "cities", label: "Cities", icon: Building2 },
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "rooms", label: "Rooms", icon: Bed },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={` max-md:hidden relative transition-all duration-500 ease-out bg-gradient-to-b from-slate-50 to-white backdrop-blur-sm border-r border-slate-200/60 h-screen flex flex-col shadow-lg ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Header / Avatar */}
      <div className="relative z-10 flex items-center justify-between p-6 border-b border-slate-200/50">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <Avatar>
                <AvatarFallback>{userInfo?.given_name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm animate-pulse" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-slate-800 tracking-tight">
                {userInfo?.given_name}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {userInfo?.userType}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto group">
            <Avatar>
              <AvatarFallback>{userInfo?.given_name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm animate-pulse" />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 text-sm font-medium relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-md hover:transform hover:scale-[1.01]"
                } ${isCollapsed ? "justify-center px-3" : "justify-start"}`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                )}

                <Icon
                  size={20}
                  className={`relative z-10 transition-all duration-200 shrink-0 ${
                    isActive
                      ? "text-white drop-shadow-sm"
                      : "text-slate-500 group-hover:text-slate-700"
                  }`}
                />

                {!isCollapsed && (
                  <span className="relative z-10 transition-all duration-200">
                    {item.label}
                  </span>
                )}

                {/* Pulse effect for active state */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-30 animate-pulse" />
                )}
              </button>

              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                  <div className="bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-xl shadow-xl">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {/* Footer */}
      <div className="relative z-10 p-4 border-t border-slate-200/50 space-y-2">
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-medium ${
            isCollapsed ? "justify-center px-3" : "justify-start"
          } text-rose-600 hover:bg-rose-50/80 hover:text-rose-700 hover:shadow-md`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
            />
          </svg>

          {!isCollapsed && <span>Logout</span>}
        </button>

        {!isCollapsed ? (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-200/50">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-500 font-medium">
              System Online
            </span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

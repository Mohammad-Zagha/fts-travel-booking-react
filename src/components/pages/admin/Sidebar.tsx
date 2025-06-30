import { useState } from "react";

const Sidebar = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-gray-800 text-white ${
        collapsed ? "w-16" : "w-64"
      } transition-all`}
    >
      <button onClick={() => setCollapsed(!collapsed)} className="p-2">
        {collapsed ? ">" : "<"}
      </button>

      <nav className="mt-4 flex flex-col space-y-2">
        <button
          onClick={() => setSelectedTab("cities")}
          className={`p-2 ${selectedTab === "cities" && "bg-gray-700"}`}
        >
          Cities
        </button>
        <button
          onClick={() => setSelectedTab("hotels")}
          className={`p-2 ${selectedTab === "hotels" && "bg-gray-700"}`}
        >
          Hotels
        </button>
        <button
          onClick={() => setSelectedTab("rooms")}
          className={`p-2 ${selectedTab === "rooms" && "bg-gray-700"}`}
        >
          Rooms
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

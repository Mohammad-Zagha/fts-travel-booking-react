import Sidebar from "./Sidebar";
import useParamsValues from "../../../hooks/useParamsKeys";
import CitiesGrid from "./CitiesGrid";
import { HotelsGrid } from "./HotelsGrid";
import { RoomsGrid } from "./RoomsGrid";

const AdminDashboard = () => {
  const { value: activeTab, setValue } = useParamsValues({
    paramKey: "active-tab",
    defaultValue: "cities",
  });

  const renderContent = () => {
    switch (activeTab) {
      case "hotels":
        return <HotelsGrid />;
      case "cities":
        return <CitiesGrid />;
      case "rooms":
        return <RoomsGrid />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setValue} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;

import useParamsValues from "../../../hooks/useParamsKeys";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn/Tabs";

const AdminDashboard = () => {
  const { value: activeTab, setValue: setActiveTab } = useParamsValues({
    paramKey: "active-tab",
    defaultValue: "technical_report",
  });

  return (
    <Tabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      className="overflow-y-auto rounded-2xl gap-0 "
    >
      <TabsList>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>

        <TabsTrigger value="technical_report">Technical Report</TabsTrigger>

        <TabsTrigger value="demo_bookings">Demo bookings</TabsTrigger>

        <TabsTrigger value="support_requests">Support Requests</TabsTrigger>
      </TabsList>

      <div className="overflow-y-auto">
        <TabsContent value="fetch_users"></TabsContent>
        <TabsContent value="fetch_tweets"></TabsContent>
        <TabsContent value="demo_bookings"></TabsContent>
        <TabsContent value="technical_report"></TabsContent>
        <TabsContent value="support_requests"></TabsContent>
        <TabsContent value="metrics"></TabsContent>
      </div>
    </Tabs>
  );
};

export default AdminDashboard;

import { useState } from "react";
import { Bed, Users } from "lucide-react";
import GridHeader from "./_components/GridHeader";
import { useFetchRooms } from "../../../hooks/admin/rooms/useFetchRooms";
import AddRoomSideSheet from "./_components/rooms/AddRoomSheet";
import EditRoomSheet from "./_components/rooms/EditRoomSheet";
import DeleteButtonDialog from "./_components/DeleteButtonDialog";
import { useDeleteRoom } from "../../../hooks/admin/rooms/useDeleteRoom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const RoomsGrid = () => {
  const { data: roomsData, isLoading } = useFetchRooms({ id: 1 });
  const { mutateAsync } = useDeleteRoom();
  const queryClient = useQueryClient();
  const [view, setView] = useState<"table" | "grid">("table");

  if (isLoading) return <div>Loading...</div>;
  if (!roomsData) return <div>No rooms found</div>;

  return (
    <div className="space-y-6">
      <GridHeader
        title="Rooms"
        count={roomsData.length}
        onAdd={<AddRoomSideSheet />}
        setView={setView}
        currentView={view}
      />

      {view === "table" ? (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Room Number
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Availability
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Adult Capacity
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Children Capacity
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Amenities
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50">
                {roomsData.map((room) => (
                  <tr
                    key={room.roomId}
                    className="hover:bg-slate-50/50 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Bed size={16} className="text-slate-400" />
                        <span className="font-medium text-slate-800 font-mono">
                          {room.roomNumber}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          room.availability
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {room.availability ? "Available" : "Occupied"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-slate-400" />
                        <span className="text-slate-600">
                          {room.capacityOfAdults}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={12} className="text-slate-400" />
                        <span className="text-slate-600">
                          {room.capacityOfChildren}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {room.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        {room.amenities.length}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <DeleteButtonDialog
                        onConfirm={() =>
                          mutateAsync(room.roomId, {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: ["rooms"],
                              });
                              toast.success("Room deleted successfully!");
                            },
                          })
                        }
                      />
                      <EditRoomSheet room={room} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomsData.map((room) => (
            <div
              key={room.roomId}
              className="bg-white border border-slate-200/50 rounded-xl shadow-md p-4 space-y-3 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-2">
                <Bed size={20} className="text-blue-500" />
                <span className="font-semibold text-slate-800 font-mono">
                  {room.roomNumber}
                </span>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    room.availability
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {room.availability ? "Available" : "Occupied"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={14} className="text-slate-400" />
                Adults: {room.capacityOfAdults}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={12} className="text-slate-400" />
                Children: {room.capacityOfChildren}
              </div>
              <div className="text-sm text-slate-500">Price: {room.price}</div>
              <div>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                  {room.amenities.length} Amenities
                </span>
              </div>
              <div className="flex justify-end"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { Hotel } from "lucide-react";
import { useFetchHotels } from "../../../hooks/admin/hotels/useFetchHotels";
import GridHeader from "./_components/GridHeader";
import { StarRating } from "./_components/StarRating";
import AddHotelSideSheet from "./_components/hotels/AddHotelSheet";
import { useDebounce } from "../../../hooks/useDebounce";
import {
  EmptyState,
  GridSkeleton,
  TableSkeleton,
} from "./_components/Skeletons";
import DeleteButtonDialog from "./_components/DeleteButtonDialog";
import { useDeleteHotel } from "../../../hooks/admin/hotels/useDeleteHotel";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import EditHotelSheet from "./_components/hotels/EditHotelSheet";

export const HotelsGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [view, setView] = useState<"table" | "grid">("table");

  const { data: hotelsData, isLoading } = useFetchHotels({
    pageNumber: 1,
    pageSize: 200,
    searchQuery: debouncedSearchQuery,
  });
  const { mutateAsync: deleteHotel } = useDeleteHotel();

  const hasHotels = hotelsData && hotelsData.length > 0;

  return (
    <div className="space-y-6">
      <GridHeader
        title="Hotels"
        onSearch={(value) => setSearchQuery(value)}
        count={hasHotels ? hotelsData.length : 0}
        onAdd={<AddHotelSideSheet />}
        setView={setView}
        currentView={view}
      />

      {isLoading ? (
        view === "table" ? (
          <TableSkeleton />
        ) : (
          <GridSkeleton />
        )
      ) : hasHotels ? (
        view === "table" ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      id
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Star Rating
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Owner
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Rooms
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Type
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50">
                  {hotelsData.map((hotel) => (
                    <tr
                      key={hotel.id}
                      className="hover:bg-slate-50/50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {hotel.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Hotel size={16} className="text-slate-400" />
                          <span className="font-medium text-slate-800">
                            {hotel.hotelName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StarRating rating={hotel.starRating} />
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {hotel.description}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                          {hotel.rooms.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {hotel.hotelType}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-4">
                        <DeleteButtonDialog
                          onConfirm={() =>
                            deleteHotel(hotel.id, {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: ["hotels"],
                                });
                                toast.success("Hotel deleted successfully");
                              },
                            })
                          }
                        />
                        <EditHotelSheet hotel={hotel} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelsData.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white border border-slate-200/50 rounded-xl shadow-md p-4 space-y-3 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-2">
                  <Hotel size={20} className="text-blue-500" />
                  <span className="font-semibold text-slate-800">
                    {hotel.hotelName}
                  </span>
                </div>
                <StarRating rating={hotel.starRating} />
                <p className="text-slate-600 text-sm">{hotel.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg font-medium">
                    {hotel.rooms.length} Rooms
                  </span>
                  <span className="text-slate-500">{hotel.hotelType}</span>
                </div>
                <div className="flex justify-end"></div>
              </div>
            ))}
          </div>
        )
      ) : (
        <EmptyState searchQuery={debouncedSearchQuery} />
      )}
    </div>
  );
};

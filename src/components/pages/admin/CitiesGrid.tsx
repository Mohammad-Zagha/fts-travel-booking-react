import { MapPin } from "lucide-react";
import GridHeader from "./_components/GridHeader";
import { useFetchCities } from "../../../hooks/admin/cities/useFetchCities";
import { useState } from "react";
import AddCitySideSheet from "./_components/cites/AddCitySideSheet";
import { useDeleteCity } from "../../../hooks/admin/cities/useDeleteCity";
import DeleteButtonDialog from "./_components/DeleteButtonDialog";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import EditCitySheet from "./_components/cites/EditCitySheet";

const CitiesGrid = () => {
  const { data: citiesData, isLoading } = useFetchCities();
  const queryClient = useQueryClient();
  const [view, setView] = useState<"table" | "grid">("table");
  const { mutateAsync: deleteCity, isPending } = useDeleteCity();
  if (isLoading) return <div>Loading...</div>;
  if (!citiesData) return <div>No cities found</div>;

  return (
    <div className="space-y-6">
      <GridHeader
        title="Cities"
        count={citiesData.length}
        onAdd={<AddCitySideSheet />}
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
                    Id
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    City Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Description
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50">
                {citiesData.map((city) => (
                  <tr
                    key={city.id}
                    className="hover:bg-slate-50/50 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-60" />
                        <span className="font-medium text-slate-800">
                          {city.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-slate-600">{city.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-sm">
                      {city.description}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DeleteButtonDialog
                          pending={isPending}
                          onConfirm={() =>
                            deleteCity(city.id, {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: ["cities"],
                                });
                                toast.success("City deleted successfully!");
                              },
                            })
                          }
                        />
                        <EditCitySheet city={city} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {citiesData.map((city) => (
            <div
              key={city.id}
              className="bg-white border border-slate-200/50 rounded-xl shadow-md p-4 space-y-3 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-blue-500" />
                <span className="font-semibold text-slate-800">
                  {city.name}
                </span>
              </div>
              <p className="text-slate-600 text-sm">{city.description}</p>
              <div className="flex justify-end">
                <div className="flex items-center gap-2">
                  <DeleteButtonDialog
                    pending={isPending}
                    onConfirm={() =>
                      deleteCity(city.id, {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["cities"],
                          });
                          toast.success("City deleted successfully!");
                        },
                      })
                    }
                  />
                  <EditCitySheet city={city} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CitiesGrid;

import { Building2 } from "lucide-react";

export const TableSkeleton = () => (
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
          {[...Array(6)].map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="px-6 py-4">
                <div className="h-4 bg-slate-200 rounded w-8"></div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 bg-slate-200 rounded"></div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-slate-200 rounded w-24"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-6 bg-slate-200 rounded-lg w-8"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-slate-200 rounded w-16"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-slate-200 rounded w-12"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const GridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-white border border-slate-200/50 rounded-xl shadow-md p-4 space-y-3 animate-pulse"
      >
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-slate-200 rounded"></div>
          <div className="h-5 bg-slate-200 rounded w-32"></div>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-slate-200 rounded"></div>
          ))}
        </div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-slate-200 rounded-lg w-16"></div>
          <div className="h-4 bg-slate-200 rounded w-12"></div>
        </div>
      </div>
    ))}
  </div>
);

export const EmptyState = ({ searchQuery }: { searchQuery?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="relative mb-6">
      <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
        <Building2 size={40} className="text-slate-400" />
      </div>
    </div>

    <div className="text-center max-w-md">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        {"No Items found"}
      </h3>
      <p className="text-slate-500 mb-6 leading-relaxed">
        {`We couldn't find any items matching "${searchQuery}". Try adjusting your search terms.`}
      </p>
    </div>
  </div>
);

import { Star, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../ui/Avatar";
import type { RecentlyVisited } from "../../../../../types";

const RecentlyVistedCard = ({ hotel }: { hotel: RecentlyVisited }) => {
  return (
    <div
      key={hotel.hotelId}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
    >
      <div className="relative overflow-hidden">
        <Avatar className="h-48 w-full rounded-none">
          <AvatarImage
            src={hotel.thumbnailUrl}
            alt={hotel.hotelName}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <AvatarFallback className="h-full w-full rounded-none bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 mb-1">
                {hotel.hotelName.charAt(0)}
              </div>
              <div className="text-xs text-gray-500">No Image</div>
            </div>
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-gray-900">
            {hotel.starRating}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
            {hotel.hotelName}
          </h3>

          <div className="flex items-center gap-1 text-gray-500 mt-1">
            <MapPin size={14} />
            <span className="text-sm">{hotel.cityName}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500">
          <Calendar size={14} />
          <span className="text-sm">
            {format(new Date(hotel.visitDate), "MMM dd, yyyy")}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Price Range
            </span>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">
                ${hotel.priceLowerBound}
              </span>
              <span className="text-gray-500"> – </span>
              <span className="text-lg font-bold text-gray-900">
                ${hotel.priceUpperBound}
              </span>
              <div className="text-xs text-gray-500">per night</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 pointer-events-none" />
    </div>
  );
};

export default RecentlyVistedCard;

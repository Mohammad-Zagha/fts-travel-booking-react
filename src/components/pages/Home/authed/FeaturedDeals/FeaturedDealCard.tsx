import { MapPin, Star, Tag } from "lucide-react";
import type { FeaturedDeal } from "../../../../../types";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../ui/Avatar";

export const FeaturedDealCard = ({ deal }: { deal: FeaturedDeal }) => {
  const discountPercentage = Math.round(
    (deal.discount / deal.originalRoomPrice) * 100
  );

  return (
    <div className="group relative w-full max-w-2xl mx-auto h-96 rounded-3xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02]  cursor-pointer">
      <div className="absolute inset-0">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage
            src={deal.roomPhotoUrl}
            alt={deal.hotelName}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <AvatarFallback className="w-full h-full object-cover rounded-none" />
        </Avatar>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60 transition-opacity duration-500 group-hover:from-black/60 group-hover:via-black/30 group-hover:to-black/50" />
      </div>

      <div className="absolute top-6 right-6 z-10">
        <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center   transition-all duration-300 group-hover:scale-110">
          <div className="text-center">
            <Tag className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs font-bold leading-none">
              {discountPercentage}%
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm opacity-90">
            <MapPin className="w-4 h-4" />
            <span>{deal.cityName}</span>
            <div className="flex items-center ml-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < deal.hotelStarRating
                      ? "text-yellow-400 fill-current"
                      : "text-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold leading-tight group-hover:text-blue-300 transition-colors duration-300">
            {deal.title}
          </h2>

          <p className="text-lg opacity-90 font-medium">at {deal.hotelName}</p>
        </div>

        <div className="space-y-4">
          <p className="text-white/90 text-sm leading-relaxed max-w-md">
            {deal.description}
          </p>

          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="text-6xl font-bold leading-none">
                ${deal.finalPrice}
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-white/70 text-lg line-through">
                  ${deal.originalRoomPrice}
                </span>
                <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Save ${deal.discount}
                </span>
              </div>
              <div className="text-white/80 text-sm">per night</div>
            </div>

            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              Book Now
            </button>
          </div>

          <div className="text-xs text-white/60 mt-2">
            *with Terms and Conditions
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-3xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

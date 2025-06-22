// SearchResults/HotelCard.tsx
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaHeart, FaShare } from "react-icons/fa";
import { Avatar, AvatarImage } from "../../ui/Avatar";
import { cardVariants, getRatingText } from "./animations";
import { NavLink } from "react-router";
interface HotelCardProps {
  hotel: any;
  index: number;
}

export const HotelCard = ({ hotel, index }: HotelCardProps) => {
  const discountedPrice = (
    hotel.roomPrice -
    (hotel.roomPrice * hotel.discount) / 100
  ).toFixed(0);

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden border border-slate-200 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          <Avatar className="w-full h-48 relative rounded-none">
            <AvatarImage
              src={hotel.roomPhotoUrl}
              alt={hotel.hotelName}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </Avatar>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {hotel.discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -12 }}
              transition={{
                delay: index * 0.05 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg"
            >
              {hotel.discount}% OFF
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors shadow-lg">
            <FaHeart className="text-sm" />
          </button>
          <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-[#06808d] transition-colors shadow-lg">
            <FaShare className="text-sm" />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <div className="text-right">
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-bold text-[#06808d]">
                  ${discountedPrice}
                </span>
              </div>
              <span className="text-xs text-slate-500">per night</span>
              {hotel.discount > 0 && (
                <div className="text-xs text-slate-400 line-through">
                  ${hotel.roomPrice}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.1 }}
              className="text-lg font-bold text-slate-800 group-hover:text-[#06808d] transition-colors duration-300 line-clamp-1"
            >
              {hotel.hotelName}
            </motion.h3>
            <div className="flex items-center space-x-1 bg-gradient-to-r from-[#98d4cd] to-[#cee4e4] px-2 py-1 rounded-md shrink-0">
              {[...Array(hotel.starRating)].map((_, idx) => (
                <FaStar key={idx} className="text-yellow-500 text-xs" />
              ))}
            </div>
          </div>

          <div className="flex items-center text-slate-600 mb-2">
            <FaMapMarkerAlt className="text-[#279ea4] text-sm mr-1" />
            <span className="text-sm">{hotel.cityName}</span>
            <span className="mx-2 text-slate-400">•</span>
            <span className="text-sm">{hotel.roomType}</span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {getRatingText(hotel.starRating)}
            </span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Free Cancellation
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {hotel.amenities
              .slice(0, 4)
              .map((amenity: any, amenityIndex: number) => (
                <motion.span
                  key={amenity.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.05 + 0.3 + amenityIndex * 0.02,
                  }}
                  className="flex items-center space-x-1 bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs"
                  title={amenity.description}
                >
                  <span>{amenity.name}</span>
                </motion.span>
              ))}
            {hotel.amenities.length > 4 && (
              <span className="text-xs text-slate-500 px-2 py-1">
                +{hotel.amenities.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.4 }}
          className="flex items-center justify-between pt-3 border-t border-slate-200"
        >
          <div className="flex items-center space-x-3">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold text-[#06808d]">
                  ${discountedPrice}
                </span>
                {hotel.discount > 0 && (
                  <span className="text-sm text-slate-400 line-through">
                    ${hotel.roomPrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">per night • taxes incl.</p>
            </div>
          </div>

          <NavLink
            to={`/hotel/${hotel.hotelId}`}
            className="bg-gradient-to-r from-[#06808d] to-[#279ea4] hover:from-[#279ea4] hover:to-[#06808d] text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            Book Now
          </NavLink>
        </motion.div>
      </div>
    </motion.div>
  );
};

import { MapPin, Star } from "lucide-react";

const HotelHeader = ({
  hotelName,
  hotelLocation,
  averageRating,
  hotelReviewsCount,
}: {
  hotelName: string;
  hotelLocation: string;
  averageRating: string | number;
  hotelReviewsCount: number;
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {hotelName}
        </h1>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{averageRating}</span>
          {hotelReviewsCount > 0 && (
            <span>
              ({hotelReviewsCount}
              {hotelReviewsCount === 1 ? "Review" : "Reviews"})
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{hotelLocation}</span>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;

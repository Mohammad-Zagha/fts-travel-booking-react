import { useParams } from "react-router";
import { Star, BedDouble } from "lucide-react";
import { Avatar, AvatarImage } from "../../ui/Avatar";
import { useHotelFullInfo } from "../../../hooks/HotelPage/useFetchHotelFullInfo";
import { Button } from "../../ui/Button";
import RoomCard from "./RoomCard";
import { ImageGallery } from "./ImageGallery";
import HotelHeader from "./HotelHeader";
import HotelAmenities from "./HotelAmenities";

export const HotelPage = () => {
  const { id } = useParams();
  console.log(id);
  const { hotel, hotelGallery, hotelRoomsAvailability, hotelReviews } =
    useHotelFullInfo(id!);

  if (!hotel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Hotel not found</h2>
          <p className="text-gray-600 mt-2">
            The hotel you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const averageRating =
    hotelReviews && hotelReviews?.length > 0
      ? (
          hotelReviews.reduce((sum, review) => sum + review.rating, 0) /
          hotelReviews.length
        ).toFixed(1)
      : hotel.starRating;

  const lowestPrice =
    hotelRoomsAvailability && hotelRoomsAvailability?.length > 0
      ? Math.min(
          ...hotelRoomsAvailability
            .filter((room) => room.availability)
            .map((room) => room.price)
        )
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-22">
      {/* Header */}
      <HotelHeader
        hotelName={hotel.hotelName}
        hotelLocation={hotel.location}
        averageRating={averageRating}
        hotelReviewsCount={hotelReviews?.length || 0}
      />
      <ImageGallery hotelGallery={hotelGallery} hotelName={hotel.hotelName} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-12">
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About this space
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {hotel.description}
            </p>
          </section>

          {/* Available Rooms Section */}
          <section className="border-b border-gray-100 pb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Rooms
              </h2>
              {hotelRoomsAvailability && hotelRoomsAvailability.length > 0 && (
                <div className="text-sm text-gray-600">
                  {
                    hotelRoomsAvailability.filter((room) => room.availability)
                      .length
                  }{" "}
                  of {hotelRoomsAvailability.length} rooms available
                </div>
              )}
            </div>
            {hotelRoomsAvailability && hotelRoomsAvailability.length > 0 ? (
              <div className="space-y-6">
                {hotelRoomsAvailability.map((room) => (
                  <RoomCard key={room.roomId} room={room} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <BedDouble className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No rooms available
                </h3>
                <p className="text-gray-600 text-lg">
                  Check back later or try different dates.
                </p>
              </div>
            )}
          </section>

          {/* Amenities Section */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              What this place offers
            </h2>
            <HotelAmenities amenities={hotel.amenities} />
          </section>

          {/* Reviews Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <h2 className="text-2xl font-bold text-gray-900">
                {averageRating} · {hotelReviews?.length || 0}{" "}
                {hotelReviews?.length === 1 ? "Review" : "Reviews"}
              </h2>
            </div>
            {hotelReviews && hotelReviews.length > 0 ? (
              <div className="space-y-8">
                {hotelReviews.map((review) => (
                  <div
                    key={review.reviewId}
                    className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src="/api/placeholder/48/48"
                          alt={review.customerName}
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {review.customerName}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {review.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <Star className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No reviews yet
                </h3>
                <p className="text-gray-600 text-lg">
                  Be the first to leave a review for this hotel.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Booking Card - Sticky Sidebar */}
        <div className="lg:col-span-5">
          <div className="sticky top-8 border border-gray-200 rounded-xl p-6 shadow-lg bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                {lowestPrice && (
                  <span className="text-3xl font-bold text-gray-900">
                    ${lowestPrice}
                  </span>
                )}
                <span className="text-gray-600 ml-2 text-lg">per night</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{averageRating}</span>
                {hotelReviews && hotelReviews?.length > 0 && (
                  <span className="text-gray-600 text-sm">
                    ({hotelReviews.length}{" "}
                    {hotelReviews.length === 1 ? "Review" : "Reviews"})
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full text-sm border-none outline-none bg-transparent font-medium"
                    defaultValue="2025-01-12"
                  />
                </div>
                <div className="border border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full text-sm border-none outline-none bg-transparent font-medium"
                    defaultValue="2025-01-13"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full py-4 text-lg font-semibold mb-4 bg-primary hover:bg-primary/90">
              Reserve Now
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

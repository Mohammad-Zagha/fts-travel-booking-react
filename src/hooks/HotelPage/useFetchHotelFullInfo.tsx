import { useFetchHotelDetails } from "./useFetchHotelDetails";
import { useFetchHotelGallery } from "./useFetchHotelGallery";
import { useFetchRoomsAvailability } from "./useFetchRoomsAvailability";
import { useFetchHotelReviews } from "./useFetchHotelReviews";

export function useHotelFullInfo(id: string) {
  const {
    data: hotel,
    isLoading: isHotelLoading,
    error: hotelError,
  } = useFetchHotelDetails({ id });

  const {
    data: hotelGallery,
    isLoading: isGalleryLoading,
    error: galleryError,
  } = useFetchHotelGallery({ id });

  const {
    data: hotelRoomsAvailability,
    isLoading: isRoomsLoading,
    error: roomsError,
  } = useFetchRoomsAvailability({ id });

  const {
    data: hotelReviews,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useFetchHotelReviews({ id });

  return {
    hotel,
    isHotelLoading,
    hotelError,

    hotelGallery,
    isGalleryLoading,
    galleryError,

    hotelRoomsAvailability,
    isRoomsLoading,
    roomsError,

    hotelReviews,
    isReviewsLoading,
    reviewsError,
  };
}

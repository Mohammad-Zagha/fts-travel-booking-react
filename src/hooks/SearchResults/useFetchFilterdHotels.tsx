import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { SearchFormValues } from "../../interfaces";
import type { HotelSearchPreview } from "../../types/hotel_types";

export function useFetchFilterdHotels({
  city,
  checkInDate,
  checkOutDate,
  adults,
  children,
  numberOfRooms,
}: SearchFormValues) {
  return useQuery({
    queryKey: [
      "filtered-hotels",
      city,
      checkInDate,
      checkOutDate,
      adults,
      children,
      numberOfRooms,
    ],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<HotelSearchPreview[]>(
          `home/search?city=${city}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}&children=${children}&numberOfRooms=${numberOfRooms}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
  });
}

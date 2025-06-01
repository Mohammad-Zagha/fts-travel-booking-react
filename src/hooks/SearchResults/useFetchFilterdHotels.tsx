import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { SearchFormValues } from "../../interfaces";

export function useFetchFilterdHotels({
  city,
  chickInDate,
  chickOutDate,
  adults,
  children,
  numberOfRooms,
}: SearchFormValues) {
  return useQuery({
    queryKey: [
      "filtered-hotels",
      city,
      chickInDate,
      chickOutDate,
      adults,
      children,
      numberOfRooms,
    ],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          `home/search?city=${city}&chickInDate=${chickInDate}&chickOutDate=${chickOutDate}&adults=${adults}&children=${children}&numberOfRooms=${numberOfRooms}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
  });
}

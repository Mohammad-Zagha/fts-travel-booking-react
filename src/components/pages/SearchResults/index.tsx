// SearchResults/index.tsx
import { useState } from "react";
import { useFetchFilterdHotels } from "../../../hooks/SearchResults/useFetchFilterdHotels";
import useQueryParams from "../../../hooks/useQueryParams";
import { EmptyState } from "./EmptyState";
import { LoadingSpinner } from "../../common/Loader";
import { FilterSidebar } from "./FilterSideBar";
import { HotelGrid } from "./HotelGrid";
import type { FilterState } from "./animations";
import SearchBar from "../../common/SearchBar/SearchBar";

const SearchResults = () => {
  const query = useQueryParams();
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    starRating: [],
    amenities: [],
    hotelType: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useFetchFilterdHotels({
    city: query.search,
    checkInDate: query.from,
    checkOutDate: query.to,
    adults: parseInt(query.adults),
    children: parseInt(query.children),
    numberOfRooms: parseInt(query.rooms),
  });

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }
  const filteredHotels = data.filter((hotel) => {
    const inPriceRange =
      hotel.roomPrice >= filters.priceRange[0] &&
      hotel.roomPrice <= filters.priceRange[1];

    const matchesStarRating =
      filters.starRating.length === 0 ||
      filters.starRating.includes(hotel.starRating);

    const matchesHotelType =
      filters.hotelType.length === 0 ||
      filters.hotelType.includes(hotel.roomType);

    const hotelAmenityIds = hotel.amenities.map((a) => a.id.toString());
    const matchesAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every((filterAmenity) =>
        hotelAmenityIds.includes(filterAmenity)
      );

    return (
      inPriceRange && matchesStarRating && matchesHotelType && matchesAmenities
    );
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#cee4e4]/10 p-10">
      <SearchBar isResultsPage />

      <div></div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          <div className="flex-1">
            {filteredHotels.length === 0 ? (
              <EmptyState />
            ) : (
              <HotelGrid hotels={filteredHotels!} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

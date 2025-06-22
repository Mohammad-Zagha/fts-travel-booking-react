import { FaStar, FaBed, FaDollarSign, FaTimes, FaCheck } from "react-icons/fa";
import { hotelTypes, type FilterState } from "./animations";
import { useFetchAmenities } from "../../../hooks/SearchResults/useFetchAmenities";

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const FilterSidebar = ({
  filters,
  setFilters,
  showFilters,
  setShowFilters,
}: FilterSidebarProps) => {
  const { data: popularAmenities } = useFetchAmenities();

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      starRating: [],
      amenities: [],
      hotelType: [],
    });
  };

  const handleStarRatingChange = (rating: number) => {
    const updated = filters.starRating.includes(rating)
      ? filters.starRating.filter((r) => r !== rating)
      : [...filters.starRating, rating];
    setFilters({ ...filters, starRating: updated });
  };

  const handleHotelTypeChange = (type: string) => {
    const updated = filters.hotelType.includes(type)
      ? filters.hotelType.filter((t) => t !== type)
      : [...filters.hotelType, type];
    setFilters({ ...filters, hotelType: updated });
  };

  const handleAmenityToggle = (id: number) => {
    const stringId = id.toString();
    const updated = filters.amenities.includes(stringId)
      ? filters.amenities.filter((a) => a !== stringId)
      : [...filters.amenities, stringId];

    setFilters({ ...filters, amenities: updated });
  };
  const handlePriceChange = (value: number) => {
    setFilters({
      ...filters,
      priceRange: [filters.priceRange[0], value],
    });
  };

  return (
    <div
      className={`w-80 bg-white rounded-xl shadow-lg border border-slate-200 h-fit sticky top-24 ${
        showFilters ? "block" : "hidden lg:block"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Filters</h3>
          <button
            onClick={() => setShowFilters(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
            <FaDollarSign className="mr-2 text-[#279ea4]" />
            Price Range
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="grid grid-cols-2 gap-2">
              {["$0-100", "$100-250", "$250-500", "$500+"].map((range) => (
                <button
                  key={range}
                  className="px-3 py-2 text-xs border border-slate-300 rounded-lg hover:bg-[#98d4cd] hover:text-[#06808d] hover:border-[#98d4cd] transition-colors"
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
            <FaStar className="mr-2 text-[#279ea4]" />
            Star Rating
          </h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={filters.starRating.includes(rating)}
                  onChange={() => handleStarRatingChange(rating)}
                  className="w-4 h-4 text-[#06808d] border-slate-300 rounded focus:ring-[#06808d]"
                />
                <div className="flex items-center space-x-1">
                  {[...Array(rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                  <span className="text-sm text-slate-600">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Hotel Type */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
            <FaBed className="mr-2 text-[#279ea4]" />
            Hotel Type
          </h4>
          <div className="space-y-2">
            {hotelTypes.map((type) => (
              <label
                key={type}
                className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={filters.hotelType.includes(type)}
                  onChange={() => handleHotelTypeChange(type)}
                  className="w-4 h-4 text-[#06808d] border-slate-300 rounded focus:ring-[#06808d]"
                />
                <span className="text-sm text-slate-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
            <FaCheck className="mr-2 text-[#279ea4]" />
            Amenities
          </h4>
          <div className="space-y-2">
            {popularAmenities?.map((amenity) => (
              <label
                key={amenity.id}
                className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity.id.toString())}
                  onChange={() => handleAmenityToggle(amenity.id)}
                  className="w-4 h-4 text-[#06808d] border-slate-300 rounded focus:ring-[#06808d]"
                />
                <span className="text-sm text-slate-600">{amenity.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearAllFilters}
          className="w-full py-2 text-sm text-[#06808d] border border-[#06808d] rounded-lg hover:bg-[#06808d] hover:text-white transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

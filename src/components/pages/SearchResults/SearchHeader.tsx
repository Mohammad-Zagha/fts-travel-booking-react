// SearchResults/SearchHeader.tsx
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";

interface SearchHeaderProps {
  hotelCount: number;
  query: any;
  sortBy: string;
  setSortBy: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const SearchHeader = ({
  hotelCount,
  query,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
}: SearchHeaderProps) => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#06808d] to-[#279ea4] bg-clip-text text-transparent">
              {hotelCount} Hotels in {query.search}
            </h1>
            <p className="text-slate-600 text-sm">
              {query.from} - {query.to} • {query.adults} adults,{" "}
              {query.children} children
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-[#98d4cd] text-[#06808d] rounded-lg hover:bg-[#279ea4] hover:text-white transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06808d]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

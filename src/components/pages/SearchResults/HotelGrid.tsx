// SearchResults/HotelGrid.tsx
import { motion } from "framer-motion";
import { HotelCard } from "./HotelCard";
import { containerVariants } from "./animations";
import type { HotelSearchPreview } from "../../../types/hotel_types";

interface HotelGridProps {
  hotels: HotelSearchPreview[];
}

export const HotelGrid = ({ hotels }: HotelGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {hotels.map((hotel: any, index: number) => (
        <HotelCard key={hotel.hotelId} hotel={hotel} index={index} />
      ))}
    </motion.div>
  );
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const getRatingText = (rating: number) => {
  if (rating >= 5) return "Exceptional";
  if (rating >= 4) return "Excellent";
  if (rating >= 3) return "Very Good";
  if (rating >= 2) return "Good";
  return "Fair";
};

// SearchResults/constants.ts
export const hotelTypes = [
  "Luxury",
  "Budget",
  "Boutique",
  "Business",
  "Resort",
  "Hostel",
];

export const popularAmenities = [
  "WiFi",
  "Parking",
  "Pool",
  "Breakfast",
  "Gym",
  "Spa",
  "Restaurant",
  "Pet Friendly",
];

// SearchResults/types.ts
export interface FilterState {
  priceRange: [number, number];
  starRating: number[];
  amenities: string[];
  hotelType: string[];
}

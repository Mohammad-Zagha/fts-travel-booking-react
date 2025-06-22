import React from "react";
import type { Amenity } from "../../../types/hotel_types";
import {
  Car,
  Wifi,
  Coffee,
  Utensils,
  Waves,
  Bath,
  Home,
  TreePine,
} from "lucide-react";
const getAmenityIcon = (amenityName: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    wifi: Wifi,
    pool: Waves,
    parking: Car,
    restaurant: Utensils,
    coffee: Coffee,
    bath: Bath,
    garden: TreePine,
  };

  const IconComponent = iconMap[amenityName.toLowerCase()] || Home;
  return <IconComponent className="w-5 h-5" />;
};
const HotelAmenities = ({ amenities }: { amenities: Amenity[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {amenities.map((amenity) => (
        <div
          key={amenity.id}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
        >
          {getAmenityIcon(amenity.name)}
          <div>
            <span className="font-medium">{amenity.name}</span>
            <p className="text-sm text-gray-600">{amenity.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelAmenities;

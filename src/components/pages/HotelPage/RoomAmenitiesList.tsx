"use client";

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

type RoomAmenitiesListProps = {
  amenities: Amenity[];
};
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
const RoomAmenitiesList: React.FC<RoomAmenitiesListProps> = ({ amenities }) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-900 mb-2">Room Amenities</h4>
      <div className="flex flex-wrap gap-2">
        {amenities.slice(0, 4).map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700"
          >
            {getAmenityIcon(amenity.name)}
            <span>{amenity.name}</span>
          </div>
        ))}
        {amenities.length > 4 && (
          <div className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
            +{amenities.length - 4} more
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomAmenitiesList;

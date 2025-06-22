"use client";

import React from "react";
import { CheckCircle, XCircle, Users, Baby, BedDouble } from "lucide-react";
import RoomAmenitiesList from "./RoomAmenitiesList"; // Ensure correct relative path
import type { RoomAvailability } from "../../../types/hotel_types";
import { Avatar, AvatarImage } from "../../ui/Avatar";
import { Button } from "../../ui/Button";

type RoomCardProps = {
  room: RoomAvailability;
};

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div
      key={room.roomId}
      className={`border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
        room.availability
          ? "border-gray-200 bg-white"
          : "border-gray-100 bg-gray-50 opacity-75"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Room Image */}
        <div className="md:col-span-4">
          <div className="relative">
            <Avatar className="w-full h-full rounded-none">
              <AvatarImage
                src={room.roomPhotoUrl}
                alt={`${room.roomType} - Room ${room.roomNumber}`}
                className="w-full h-48 md:h-full object-cover"
              />
            </Avatar>
            <div className="absolute top-3 left-3">
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  room.availability
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {room.availability ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    Available
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3" />
                    Unavailable
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="md:col-span-8 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {room.roomType}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Room #{room.roomNumber}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{room.capacityOfAdults} Adults</span>
                </div>
                {room.capacityOfChildren > 0 && (
                  <div className="flex items-center gap-1">
                    <Baby className="w-4 h-4" />
                    <span>{room.capacityOfChildren} Children</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${room.price}
              </div>
              <div className="text-sm text-gray-600">per night</div>
            </div>
          </div>

          {/* Amenities */}
          {room.roomAmenities && room.roomAmenities.length > 0 && (
            <RoomAmenitiesList amenities={room.roomAmenities} />
          )}

          {/* Book Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{room.roomType}</span>
            </div>
            <Button
              disabled={!room.availability}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                room.availability
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {room.availability ? "Book Now" : "Unavailable"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

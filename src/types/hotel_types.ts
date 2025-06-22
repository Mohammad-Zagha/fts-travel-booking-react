export type Amenity = {
  id: number;
  name: string;
  description: string;
};

export type Room = {
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
  maxOccupancy: number;
};
export type HotelGallery = {
  id: number;
  url: string;
};
export type Hotel = {
  id: number;
  hotelName: string;
  location: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude: number;
  longitude: number;
  rooms: Room[];
  imageUrl: string;
  availableRooms: number;
  cityId: number;
  amenities: Amenity[];
};
export type HotelSearchPreview = {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: Amenity[];
  numberOfChildren: number;
  numberOfAdults: number;
  numberOfRooms: number;
  checkInDate: string; // ISO string, e.g. "2025-01-31"
  checkOutDate: string; // ISO string, e.g. "2025-02-01"
};
export type RoomAvailability = {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: Amenity[];
  price: number;
  availability: boolean;
};
export type Review = {
  reviewId: number;
  customerName: string;
  rating: number;
  description: string;
};

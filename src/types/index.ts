
export type UserType = "User" | "Admin";
export type FeaturedDeal = {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
};

export type UserInfo = {
  user_id: string;
  given_name: string;
  family_name: string;
  userType: UserType;
  nbf: number;
  exp: number;
  iss: string;
};
export type RecentlyVisited = {
  hotelId: number;
  hotelName: string;
  starRating: number;
  visitDate: string;
  cityName: string;
  thumbnailUrl: string;
  priceLowerBound: number;
  priceUpperBound: number;
};
export type Destination = {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
};


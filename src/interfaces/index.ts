export interface ScheduleItemProps {
  title: string;
  date?: string;
  location: string;
  thumbnailUrl?: string;
}

export interface SearchFormValues {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  numberOfRooms: number;
}

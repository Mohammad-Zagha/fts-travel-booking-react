export interface ScheduleItemProps {
  title: string;
  date?: string;
  location: string;
  thumbnailUrl?: string;
}

export interface SearchFormValues {
  city: string;
  chickInDate: string;
  chickOutDate: string;
  adults: number;
  children: number;
  numberOfRooms: number;
}
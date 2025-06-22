import type { HotelGallery } from "../../../types/hotel_types";
import { Avatar, AvatarImage } from "../../ui/Avatar";

export const ImageGallery = ({
  hotelGallery,
  hotelName,
}: {
  hotelGallery?: HotelGallery[];
  hotelName: string;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8 rounded-xl overflow-hidden">
      {hotelGallery && hotelGallery.length > 0 && (
        <>
          <Avatar className="lg:row-span-2 w-full h-full rounded-none">
            <AvatarImage
              src={hotelGallery[0].url}
              alt={hotelName}
              className="w-full h-64 lg:h-96 object-cover hover:scale-105 transition-transform duration-300"
            />
          </Avatar>
          <div className="grid grid-cols-2 gap-2">
            {hotelGallery.slice(1, 5).map((image, index) => (
              <Avatar className=" w-full h-full rounded-none" key={image.id}>
                <AvatarImage
                  src={image.url}
                  alt={`${hotelName} ${index + 2}`}
                  className="w-full h-30 lg:h-46 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Avatar>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

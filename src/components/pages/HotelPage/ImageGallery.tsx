import { useState } from "react";
import type { HotelGallery } from "../../../types/hotel_types";
import { Avatar, AvatarImage } from "../../ui/Avatar";
import { motion, AnimatePresence } from "framer-motion";

export const ImageGallery = ({
  hotelGallery,
  hotelName,
}: {
  hotelGallery?: HotelGallery[];
  hotelName: string;
}) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const openFullscreen = (url: string) => setFullscreenImage(url);
  const closeFullscreen = () => setFullscreenImage(null);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8 rounded-xl overflow-hidden">
        {hotelGallery && hotelGallery.length > 0 && (
          <>
            <Avatar
              className="lg:row-span-2 w-full h-full rounded-none cursor-pointer"
              onClick={() => openFullscreen(hotelGallery[0].url)}
            >
              <AvatarImage
                src={hotelGallery[0].url}
                alt={hotelName}
                className="w-full h-64 lg:h-96 object-cover hover:scale-105 transition-transform duration-300"
              />
            </Avatar>
            <div className="grid grid-cols-2 gap-2">
              {hotelGallery.slice(1, 5).map((image, index) => (
                <Avatar
                  className="w-full h-full rounded-none cursor-pointer"
                  key={image.id}
                  onClick={() => openFullscreen(image.url)}
                >
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

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            key="fullscreen-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-pointer"
          >
            <motion.img
              src={fullscreenImage}
              alt="Fullscreen"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()} // prevent modal close on image click
              className="max-w-full max-h-full object-contain"
            />
            <motion.button
              onClick={closeFullscreen}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute top-5 right-5 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Close fullscreen image"
            >
              &times;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

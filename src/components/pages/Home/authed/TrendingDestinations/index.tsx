import { Star } from "lucide-react";
import { FiMapPin } from "react-icons/fi";
import { useFetchDestinations } from "../../../../../hooks/home/useFetchDestinations";
import type { ScheduleItemProps } from "../../../../../interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../ui/Avatar";
import { Skeleton } from "../../../../ui/Skeleton";
import { motion } from "framer-motion";

const TrendingDestinations = () => {
  const { data: destinations, isLoading } = useFetchDestinations();
  return (
    <section
      id="destinations"
      className="px-4 py-16 md:px-12 lg:px-20 text-white bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"
    >
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
        <Star className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium text-white/70">Trending Now</span>
      </div>

      <h1 className="mb-12 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        Top Destinations
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(80px,_auto)]">
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => <LoadingCard key={i} />)
          : destinations?.map((destination) => (
              <ScheduleItem
                key={destination.cityId}
                title={destination.cityName}
                location={destination.countryName}
                thumbnailUrl={destination.thumbnailUrl}
              />
            ))}
      </div>
    </section>
  );
};

export default TrendingDestinations;

const ScheduleItem = ({
  title,
  date,
  location,
  thumbnailUrl,
}: ScheduleItemProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.75 }}
      style={{ willChange: "transform, opacity" }}
      className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-5"
    >
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full rounded-full object-cover"
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center">
            {title[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold text-white">{title}</p>
          {date && <p className="text-xs uppercase text-secondary">{date}</p>}
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-end text-xs uppercase text-secondary">
        <p>{location}</p>
        <FiMapPin className="text-base" />
      </div>
    </motion.div>
  );
};

const LoadingCard = () => (
  <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-5">
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full bg-zinc-700" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 bg-zinc-700" />
        <Skeleton className="h-3 w-20 bg-zinc-700" />
      </div>
    </div>
    <Skeleton className="h-4 w-16 bg-zinc-700" />
  </div>
);

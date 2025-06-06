import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { useFetchDestinations } from "../../../../../hooks/home/useFetchDestinations";
import type { Destination } from "../../../../../types";
import type { ScheduleItemProps } from "../../../../../interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../ui/Avatar";

export const SmoothScrollHero = () => {
  const { data: destinations } = useFetchDestinations();

  return (
    <div className="bg-zinc-900">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
        <Schedule destinations={destinations || []} />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const SCROLL_OFFSET = 1500;

  const clip1 = useTransform(
    scrollY,
    [SCROLL_OFFSET, SCROLL_OFFSET + 1500],
    [25, 0]
  );
  const clip2 = useTransform(
    scrollY,
    [SCROLL_OFFSET, SCROLL_OFFSET + 1500],
    [75, 100]
  );

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [SCROLL_OFFSET, SCROLL_OFFSET + SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );

  const opacity = useTransform(
    scrollY,
    [SCROLL_OFFSET + SECTION_HEIGHT, SCROLL_OFFSET + SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url('/assets/4keygpt.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1590959914819-b767b9fe4cfb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3 h-[400px] object-cover rounded-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1574864745093-5566c5be5855?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,

    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = ({ destinations }: { destinations: Destination[] }) => {
  return (
    <section
      id="destinations"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-primary"
      >
        Top Destinations
      </motion.h1>

      {destinations?.map((destination) => (
        <ScheduleItem
          key={destination.cityId}
          title={destination.cityName}
          location={destination.countryName}
          thumbnailUrl={destination.thumbnailUrl}
        />
      ))}
    </section>
  );
};

export const ScheduleItem = ({
  title,
  date,
  location,
  thumbnailUrl,
}: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-5 backdrop-blur"
    >
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={thumbnailUrl} alt={title} loading="lazy" />
          <AvatarFallback>{title[0]}</AvatarFallback>
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

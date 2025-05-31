import { motion } from "framer-motion";
import HeroStats from "./unAuthed/Hero/HeroStatus";
import { useAuth } from "../../../context/authContext";
import SearchBar from "../../common/SearchBar";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="relative h-dvh w-full overflow-hidden lg:p-10">
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
        <div className="relative w-full max-w-[90%] h-[90%] rounded-[40px] overflow-hidden">
          <motion.img
            src="./assets/egypt.jpg"
            alt=""
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-1/2 top-[25%] -translate-x-1/2 -translate-y-1/2 text-white font-bold
          text-[80px] sm:text-[120px] md:text-[160px] lg:text-[180px] xl:text-[200px] 2xl:text-[240px]"
          >
            Traverce
          </motion.div>

          {/* Pyramid overlay */}
          {!isAuthenticated && (
            <motion.img
              src="./assets/peramid.png"
              alt=""
              className="absolute object-contain max-lg:hidden"
              initial={{ scale: 1.2, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, x: "-50%", y: "-50%" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                top: "50%",
                left: "50%",
                width: "100%",
                maxWidth: "1200px",
                height: "auto",
              }}
            />
          )}
        </div>
      </div>

      {isAuthenticated && <SearchBar />}

      {/* Stats at bottom */}
      <div className="h-full w-full flex flex-col items-start justify-end text-white text-center p-20">
        <HeroStats />
      </div>
    </div>
  );
};

export default Hero;

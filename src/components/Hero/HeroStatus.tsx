import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroStats = () => {
  return (
    <motion.div
      className="relative z-10 mt-12 w-full max-w-7xl px-4 text-white text-left"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="flex flex-wrap justify-start gap-10 sm:gap-20 mb-8">
        {[
          { value: "10k+", label: "Happy Travelers" },
          { value: "500+", label: "Custom Tours" },
          { value: "5k+", label: "Hotel Stays Arranged" },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <h2 className="text-4xl font-semibold">{stat.value}</h2>
            <p className="text-sm text-white/80 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-start gap-4"
        variants={containerVariants}
      >
        <motion.button
          variants={itemVariants}
          className="flex items-center gap-2 px-6 py-2 border border-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition"
        >
          Book Now <ArrowUpRight size={16} />
        </motion.button>

        <motion.p
          variants={itemVariants}
          className="max-w-md text-sm text-white/80"
        >
          Journey across continents, cultures, and landscapes—because every path
          leads to new discoveries.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default HeroStats;

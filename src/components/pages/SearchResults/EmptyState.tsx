// SearchResults/EmptyState.tsx
import { motion } from "framer-motion";
import { FaBed } from "react-icons/fa";

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" flex items-center justify-center bg-gradient-to-br from-slate-50 to-white"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-[#cee4e4] rounded-full flex items-center justify-center mx-auto mb-4">
          <FaBed className="text-2xl text-[#06808d]" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          No Hotels Found
        </h3>
        <p className="text-slate-500 text-sm">
          Try adjusting your search criteria
        </p>
      </div>
    </motion.div>
  );
};

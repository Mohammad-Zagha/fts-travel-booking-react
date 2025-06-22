import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner = ({
  message = "Loading...",
  size = "md",
  color = "#06808d",
  fullScreen = true,
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const containerClasses = fullScreen
    ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white"
    : "flex items-center justify-center p-8";

  return (
    <div className={`${containerClasses} ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} border-4 rounded-full mx-auto mb-3`}
          style={{
            borderColor: color,
            borderTopColor: "transparent",
          }}
        />
        <p className="text-base font-medium text-slate-600">{message}</p>
      </motion.div>
    </div>
  );
};

import { FaMinus, FaPlus } from "react-icons/fa";
import { cn } from "../../lib/utils";

export const CounterControl = ({
  label,
  value,
  onDecrement,
  onIncrement,
  min = 0,
  max = 10,
  description,
}: {
  label: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
  max?: number;
  description?: string;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-black">{label}</span>
      {description && (
        <span className="text-xs text-gray-500 mt-1">{description}</span>
      )}
    </div>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        className={cn(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          value <= min
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-primary text-primary hover:bg-muted hover:border-secondary"
        )}
      >
        <FaMinus size={12} />
      </button>
      <span className="w-8 text-center font-semibold text-black">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        className={cn(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          value >= max
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-primary text-primary hover:bg-muted hover:border-secondary"
        )}
      >
        <FaPlus size={12} />
      </button>
    </div>
  </div>
);

import { Input } from "../../../ui/Input";
import { LayoutGrid, Table } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../../../ui/Button";

const GridHeader = ({
  title,
  count,
  onAdd,
  setView,
  currentView,
  onSearch,
}: {
  title: string;
  count: number;
  onAdd: ReactNode;
  onSearch?: (value: string) => void;
  setView?: (view: "table" | "grid") => void;
  currentView?: "table" | "grid";
}) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 w-full gap-4">
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <h1 className="text-2xl md:text-3xl max-md:text-center font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <span className="px-3 py-1 max-md:mx-auto bg-gradient-to-r from-secondary to-primary text-white text-sm font-medium rounded-full shadow-lg w-max">
        {count} items
      </span>
    </div>

    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
      <Input
        placeholder="Search..."
        containerClassName="w-full"
        onChange={(e) => onSearch?.(e.target.value)}
      />

      <div className="flex gap-2 max-md:flex-row-reverse -">
        {setView && (
          <>
            <Button
              variant={currentView === "grid" ? "filled-primary" : "ghost"}
              size="icon-md"
              onClick={() => setView("grid")}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={currentView === "table" ? "filled-primary" : "ghost"}
              size="icon-md"
              onClick={() => setView("table")}
            >
              <Table />
            </Button>
          </>
        )}
        {onAdd}
      </div>
    </div>
  </div>
);

export default GridHeader;

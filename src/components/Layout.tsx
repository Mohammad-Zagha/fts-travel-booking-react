import { type ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="space-y-2">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

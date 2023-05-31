import React from "react";
import SideBar from "./SideBar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1">
      <SideBar />
      {children}
    </div>
  );
};

export default AppLayout;

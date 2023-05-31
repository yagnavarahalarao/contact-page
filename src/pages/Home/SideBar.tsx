import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const sideBarActs = [
  {
    title: "Contacts",
    link: "/contact",
  },
  {
    title: "Charts and Maps",
    link: "/charts",
  },
];

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-3/12 flex flex-col p-3 gap-4">
      {sideBarActs.map(({ title, link }) => (
        <Link to={link}>
          <div
            className={`${
              pathname === link
                ? "bg-green-500 hover:bg-green-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            {title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;

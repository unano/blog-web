import React, { useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const Menu = () => {
  const bfLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "register", path: "/register" },
  ];
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <ul className="navs">
        <Search />
        {bfLoginLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
        <li className="nav-item dropdown">
          <span onClick={() => setShowDropdown(!showDropdown)}>username</span>
          {showDropdown && (
            <ul className="drop_down">
              <li className="dropdown_item">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="dropdown_item">
                <Link to="/profile">Logout</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </>
  );
};

export default Menu;

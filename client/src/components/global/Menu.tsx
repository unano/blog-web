import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const Menu = () => {
  const bfLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "register", path: "/register" },
  ];
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
          <span
            className="dropdown-toggle"
            id="navDropDown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            username
          </span>
          <ul className="dropdown-menu" aria-labelledby="navDropDown">
            <li>
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/profile">
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default Menu;

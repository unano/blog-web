import React, { useState } from "react";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../utils/TypeScript"; 
import { logout } from "../../redux/actions/authAction";
const Menu = () => {
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const { pathname } = useLocation()
  
  const bfLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];

  const afLoginLinks = [
    { label: "Home", path: "/" },
    { label: "CreateBlog", path: "/create_blog" },
  ];

  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks

    const isActive = (pn: string) => {
      if (pn === pathname) return "actived";
    };
  
  const handleLogout = () => {
    if (!auth.access_token) return;
     dispatch(logout(auth.access_token) as any)
  }

  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <div className="head">
      <Link to="/">BlogApp</Link>
      <Search />
      </div>
      <ul className="navs">
        {navLinks.map((link, index) => (
          <li key={index} className={isActive(link.path)}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}

        {auth.user?.role === "admin" && (
          <li className={`${isActive("/category")}`}>
            <Link to="/category">Category</Link>
          </li>
        )}

        {auth.user && (
          <li className="nav-item dropdown">
            <span onClick={() => setShowDropdown(!showDropdown)}>
              <img src={auth.user.avatar} alt="avatar" className="avatar" />
            </span>
            {showDropdown && (
              <ul className="drop_down">
                <li className="dropdown_item">
                  <Link to={`/profile/${auth.user._id}?page=1`}>Profile</Link>
                </li>
                <li className="dropdown_item">
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;

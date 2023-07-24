import React, { useState, useEffect } from "react";
import "./MainHeader.css";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function MainHeader() {
  const [allMenus, setAllMenus] = useState([]);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((data) => setAllMenus(data));
  }, []);
  return (
    <div>
      <div class='main-header'>
        <div class='container-fluid'>
          <div class='main-header__content'>
            <div class='main-header__right'>
              <img
                src='/images/logo/Logo.png'
                class='main-header__logo'
                alt='لوگوی سبزلرن'
              />

              <ul class='main-header__menu'>
                <li class='main-header__item'>
                  <a href='#' class='main-header__link'>
                    صفحه اصلی
                  </a>
                </li>
                {allMenus.map((menu) => (
                  <li class='main-header__item' key={menu.id}>
                    <Link to={menu.href} class='main-header__link'>
                      {menu.title}
                      {menu.submenus.length !== 0 && (
                        <>
                          <i class='fas fa-angle-down main-header__link-icon'></i>
                          <ul class='main-header__dropdown'>
                            {menu.submenus.map((submenu) => (
                              <li
                                class='main-header__dropdown-item'
                                key={submenu.id}>
                                <Link
                                  to={submenu.href}
                                  class='main-header__dropdown-link'>
                                  {submenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div class='main-header__left'>
              <a href='#' class='main-header__search-btn'>
                <i class='fas fa-search main-header__search-icon'></i>
              </a>
              <a href='#' class='main-header__cart-btn'>
                <i class='fas fa-shopping-cart main-header__cart-icon'></i>
              </a>
              {authContext.isLoggedIn ? (
                <Link to='#' class='main-header__profile'>
                  <span class='main-header__profile-text'>
                    {authContext.userInfo.name}
                  </span>
                </Link>
              ) : (
                <Link to='/login' class='main-header__profile'>
                  <span class='main-header__profile-text'>ثبت نام / ورود</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

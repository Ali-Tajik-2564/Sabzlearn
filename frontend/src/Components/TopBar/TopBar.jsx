import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopBar.css";
export default function TopBar() {
  const [allTopBartLink, setAllTopBarLinks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/v1/menus/topbar")
      .then((res) => res.json())
      .then((data) => setAllTopBarLinks(data));
  }, []);

  const RandomTopBarLinks = useCallback((arr, linksCount) => {
    let shuffle = [...arr].sort(() => 0.5 - Math.random());
    return shuffle.slice(0, linksCount);
  });
  return (
    <div>
      <div class='top-bar'>
        <div class='container-fluid'>
          <div class='top-bar__content'>
            <div class='top-bar__right'>
              <ul class='top-bar__menu'>
                {RandomTopBarLinks(allTopBartLink, 5).map((link) => (
                  <li class='top-bar__item'>
                    <Link
                      to={`/course-info/${link.href}`}
                      class='top-bar__link'>
                      {link.title}
                    </Link>
                  </li>
                ))}

                <li class='top-bar__item'>
                  <a href='#' class='top-bar__link'>
                    20,000 تومان
                  </a>
                </li>
              </ul>
            </div>
            <div class='top-bar__left'>
              <div class='top-bar__email'>
                <a href='#' class='top-bar__email-text top-bar__link'>
                  sabzlearn@gmail.com
                </a>
                <i class='fas fa-envelope top-bar__email-icon'></i>
              </div>
              <div class='top-bar__phone'>
                <a href='#' class='top-bar__phone-text top-bar__link'>
                  09921558293
                </a>
                <i class='fas fa-phone top-bar__phone-icon'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

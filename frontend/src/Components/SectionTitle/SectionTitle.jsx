import React from "react";
import "./SectionTitle.css";
import { Link } from "react-router-dom";
export default function SectionTitle({ title, desc, BtnTitle, BtnHref }) {
  return (
    <div>
      <div class='courses-header'>
        <div class='courses-header__right'>
          <span class='courses-header__title title'>{title}</span>
          <span class='courses-header__text'>{desc}</span>
        </div>
        {BtnTitle && (
          <div class='courses-header__left'>
            <Link to={`/${BtnHref}`} class='courses-header__link'>
              {BtnTitle}
              <i class='fas fa-arrow-left courses-header__icon'></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";
import "./BoxInfo.css";
export default function BoxInfo({ title, icon, desc }) {
  return (
    <div class='col-6'>
      <div class='about-us__box'>
        <div class='about-us__box-right'>
          <i class={`far fa-${icon} about-us__icon`}></i>
        </div>
        <div class='about-us__box-left'>
          <span class='about-us__box-title'>{title}</span>
          <span class='about-us__box-text'>{desc}</span>
        </div>
      </div>
    </div>
  );
}

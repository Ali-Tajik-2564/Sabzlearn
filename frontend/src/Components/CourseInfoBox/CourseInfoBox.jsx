import React from "react";
import "./CourseInfoBox.css";
export default function CourseInfoBox({ title, desc, icon }) {
  return (
    <div class='col-4'>
      <div class='course-boxes__box'>
        <div class='course-boxes__box-right'>
          <i class={`course-boxes__box-right-icon fas fa-${icon}`}></i>
        </div>
        <div class='course-boxes__box-left'>
          <span class='course-boxes__box-left-title'>{title}</span>
          <span class='course-boxes__box-left--subtitle'>{desc}</span>
        </div>
      </div>
    </div>
  );
}

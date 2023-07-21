import React from "react";
import "./FooterItem.css";
export default function FooterItem({ title, children }) {
  return (
    <div class='col-4'>
      <div class='footer-widgets__item'>
        <span class='footer-widgets__title'>{title}</span>
        <p class='footer-widgets__text'>{children}</p>
      </div>
    </div>
  );
}

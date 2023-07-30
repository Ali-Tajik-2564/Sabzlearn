import React from "react";
import "./LastArticleBox.css";
import { Link } from "react-router-dom";
export default function LastArticleBox({
  cover,
  title,
  shortName,
  description,
}) {
  return (
    // <div class='col-4'>
    <div class='article-card'>
      <div class='article-card__header'>
        <Link to={`article-info/${shortName}`} class='article-card__link-img'>
          <img
            src='./images/blog/1.jpg'
            class='article-card__img'
            alt='Article Cover'
          />
        </Link>
      </div>
      <div class='article-card__content'>
        <Link to={`article-info/${shortName}`} class='article-card__link'>
          {title}
        </Link>
        <p class='article-card__text'>{description}</p>
        <Link to={`article-info/${shortName}`} class='article-card__btn'>
          بیشتر بخوانید
        </Link>
      </div>
    </div>
    // </div>
  );
}

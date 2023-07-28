import React, { useState } from "react";
import "./CourseBox.css";
import CircleSpinner from "./../CircleSpinner/CircleSpinner";
import { Link } from "react-router-dom";

export default function CourseBox(props) {
  const [isShowImg, setIsShowImg] = useState(false);
  return (
    <div class='course-box'>
      <Link to={`/course-info/${props.shortName}`}>
        <img
          src='/images/courses/fareelancer.png'
          alt='Course img'
          class='course-box__img'
          onLoad={() => setIsShowImg(true)}
        />
        {!isShowImg && <CircleSpinner />}
      </Link>
      <div class='course-box__main'>
        <Link to={`/course-info/${props.shortName}`} class='course-box__title'>
          {props.name}
        </Link>

        <div class='course-box__rating-teacher'>
          <div class='course-box__teacher'>
            <i class='fas fa-chalkboard-teacher course-box__teacher-icon'></i>
            <a href='#' class='course-box__teacher-link'>
              {props.creator}
            </a>
          </div>
          <div class='course-box__rating'>
            <img
              src='/images/svgs/star.svg'
              alt='rating'
              class='course-box__star'
            />
            <img
              src='/images/svgs/star_fill.svg'
              alt='rating'
              class='course-box__star'
            />
            <img
              src='/images/svgs/star_fill.svg'
              alt='rating'
              class='course-box__star'
            />
            <img
              src='/images/svgs/star_fill.svg'
              alt='rating'
              class='course-box__star'
            />
            <img
              src='/images/svgs/star_fill.svg'
              alt='rating'
              class='course-box__star'
            />
          </div>
        </div>

        <div class='course-box__status'>
          <div class='course-box__users'>
            <i class='fas fa-users course-box__users-icon'></i>
            <span class='course-box__users-text'>500</span>
          </div>
          <span class='course-box__price'>
            {props.price === 0 ? "رایگان" : props.price}
          </span>
        </div>
      </div>

      <div class='course-box__footer'>
        <Link
          to={`/course-info/${props.shortName}`}
          class='course-box__footer-link'>
          مشاهده اطلاعات
          <i class='fas fa-arrow-left course-box__footer-icon'></i>
        </Link>
      </div>
    </div>
  );
}

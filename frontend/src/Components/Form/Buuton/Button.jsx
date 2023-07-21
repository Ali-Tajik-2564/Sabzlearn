import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
export default function Button(props) {
  if (props.to) {
    return (
      <Link to={props.to} className={props.className}>
        {children}
      </Link>
    );
  } else if (props.href) {
    return (
      <a href={props.href} className={props.href}>
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={props.className}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
      </button>
    );
  }
}

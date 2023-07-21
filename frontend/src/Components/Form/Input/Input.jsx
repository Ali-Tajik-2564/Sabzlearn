import React, { useEffect, useReducer } from "react";
import "./Input.css";
import Validator from "../../../Validator/Validator";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: Validator(action.value, action.validation),
      };
    }
    default: {
      return state;
    }
  }
};
export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    isValid: false,
    value: "",
  });
  const { value, isValid } = mainInput;
  const { id, onInputHandler } = props;
  useEffect(() => {
    onInputHandler(id, value, isValid);
  }, [value]);
  const changeInputHandler = (event) => {
    dispatch({
      type: "CHANGE",
      isValid: true,
      value: event.target.value,
      validation: props.validations,
    });
  };
  const Elements =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid ? "success" : "error"
        }`}
        value={mainInput.value}
        onChange={(event) => changeInputHandler(event)}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        onChange={(event) => changeInputHandler(event)}
        className={`${props.className} ${
          mainInput.isValid ? "success" : "error"
        }`}
        value={mainInput.value}
      />
    );
  return <div>{Elements}</div>;
}

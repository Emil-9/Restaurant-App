import classes from "./Input.module.css";
import React, { useEffect, useState } from "react";

const Input = React.forwardRef((props, ref) => {
  const [isTouched, setIsTouched] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputClass = `${props.className} ${classes["custom-input"]}`;

  const [labelClass, setLabelClass] = useState(`${classes["custom-label"]}`);

  const focusHandler = (event) => {
    setIsTouched(true);
  };
  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const blurHandler = (event) => {
    setIsTouched(false);
  };

  useEffect(() => {
    if (isTouched || inputValue !== "") {
      setLabelClass((prevState) => `${prevState} ${classes.focused}`);
    } else {
      setLabelClass(`${classes["custom-label"]}`);
    }
  }, [isTouched, inputValue]);

  return (
    <div className={classes.inputWrapper}>
      {props.label === true && (
        <label className={labelClass} htmlFor={props.id}>
          {props.labelText}
        </label>
      )}
      <input
        type={props.type}
        onBlur={blurHandler}
        onChange={inputChangeHandler}
        onFocus={focusHandler}
        className={inputClass}
        name={props.id}
        ref={ref}
        {...props.input}
      />
    </div>
  );
});
export default Input;

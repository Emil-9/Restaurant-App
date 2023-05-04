import { useEffect, useRef, useState } from "react";
import Input from "../../UI/Input";
import MessageModal from "../../UI/MessageModal";
import classes from "./MealItemForm.module.css";

const MealitemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [fadingClass, setFadingClass] = useState({});
  const [itemAmount, setItemAmount] = useState(1);

  // to enable the custom component to pass ref from the parent as an attribute we need useRef
  const amountInputRef = useRef();

  const IncreaseItem = (item) => {
    item.preventDefault();
    setItemAmount((prev) => {
      return +prev + 1;
    });
  };
  const DecreaseItem = (item) => {
    item.preventDefault();
    setItemAmount((prev) => {
      return +prev - 1;
    });
  };

  const changeValueHandler = (event) => {
    setItemAmount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // pass the ref amount as an integer or number not as a string
    const enteredAmount = +amountInputRef.current.value;
    // const enteredTotalAmount = amountInputRef.current.value;
    if (enteredAmount < 1 || enteredAmount > 10) {
      setAmountIsValid(false);
      return;
    } else {
      setAmountIsValid(true);
      props.onAddToCart(enteredAmount);
    }
  };

  // clear the error message after 1.5s after displaying it
  useEffect(() => {
    //  if the amount is valid return don't show the message
    if (amountIsValid) {
      return;
    }
    setFadingClass(classes["fading"]);
    // add the message and clear it after a while
    const timerDelete = setTimeout(() => {
      setAmountIsValid(true);
      setFadingClass(classes[""]);
    }, 2500);
    // clear the timout function before executing the useEffect to avoid accumilating delays
    return () => {
      clearTimeout(timerDelete);
    };
  }, [amountIsValid]);

  return (
    <form className={classes["add-meal-form"]} onSubmit={submitHandler}>
      <div className={classes.leftContainer}>
        <button className={classes["add-button"]} onClick={DecreaseItem}>
          -
        </button>
        <Input
          ref={amountInputRef}
          input={{
            className: classes["meal-form-input"],
            type: "number",
            id: "amount_" + props.id,
            step: 1,
            value: itemAmount,
            onChange: changeValueHandler,
          }}
        />
        <button className={classes["add-button"]} onClick={IncreaseItem}>
          +
        </button>
      </div>
      <button className={classes["main-button"]}>Add to Cart</button>
      {!amountIsValid && (
        <MessageModal className={fadingClass}>
          <p>Sorry This amount is not valid (1- 10)</p>
        </MessageModal>
      )}
    </form>
  );
};
export default MealitemForm;

import { useRef, useState } from "react";
import useRandomNumber from "../../hooks/use-random-number";
import Input from "../UI/Input";
import MessageModal from "../UI/MessageModal";
import classes from "./CheckOut.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isEmailValid = (value) =>
  value
    .trim()
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null;
const isNumberValid = (value) => value.trim().length === 10;

const CheckOut = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    address: true,
    number: true,
    email: true,
    city: true,
  });

  const nameInputRef = useRef();
  const numberInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();
  const emailInputRef = useRef();

  const { randomNumber } = useRandomNumber();

  const checkoutSubmitHandler = (event) => {
    event.preventDefault();

    const userData = {
      userId: randomNumber,
      fullName: nameInputRef.current.value.trim(),
      number: numberInputRef.current.value,
      email: emailInputRef.current.value,
      city: cityInputRef.current.value,
      address: addressInputRef.current.value,
    };

    // return true or faulse in these functions
    const nameIsValid = !isEmpty(userData.fullName);
    const addressIsValid = !isEmpty(userData.address);
    const numberIsValid = isNumberValid(userData.number);
    const emailIsValid = isEmailValid(userData.email);
    const cityIsValid = !isEmpty(userData.city);
    
    // form is valid only if all conditions are valid
    setFormIsValid({
      name: nameIsValid,
      address: addressIsValid,
      number: numberIsValid,
      email: emailIsValid,
      city: cityIsValid,
    });

    if (nameIsValid || addressIsValid ||numberIsValid || emailIsValid || cityIsValid) {
      console.log("form is valid");
      props.onConfirmOrder(userData);
    }

    // pass the values to the parent component using props -> component is rendered in cart.jsx
  };

  return (
    <form className={classes["checkout-form"]} onSubmit={checkoutSubmitHandler}>
      <div className={classes["form-container"]}>
        <div className={classes["checkout-input-wrapper"]}>
          <Input
            ref={nameInputRef}
            label={true}
            className={classes["checkout-input"]}
            type="text"
            name="fullName"
            id="fullName"
            labelText="Full Name"
          />
          {!formIsValid.name && (
            <p className={classes.errorParagraph}>Please Enter the Name</p>
          )}
        </div>
        <div className={classes["checkout-input-wrapper"]}>
          <Input
            ref={numberInputRef}
            label={true}
            className={classes["checkout-input"]}
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            labelText="phone Number"
          />
          {!formIsValid.number && (
            <p className={classes.errorParagraph}>Number should be 10 digits</p>
          )}
        </div>
        <div className={classes["checkout-input-wrapper"]}>
          <Input
            ref={emailInputRef}
            label={true}
            className={classes["checkout-input"]}
            type="email"
            name="email"
            id="email"
            labelText="E-mail"
          />
          {!formIsValid.email && (
            <p className={classes.errorParagraph}>Email is not valid</p>
          )}
        </div>
        <div className={classes["checkout-input-wrapper"]}>
          <select
            className={classes["checkout-select"]}
            name="city"
            id="city"
            ref={cityInputRef}
          >
            <option value="">---</option>
            <option value="dubai">Dubai</option>
            <option value="sharjah">Sharjah</option>
            <option value="ajman">Ajman</option>
          </select>
          {!formIsValid.city && (
            <p className={classes.errorParagraph}>Please choose a city</p>
          )}
        </div>
        <div className={classes["checkout-input-wrapper"]}>
          <Input
            ref={addressInputRef}
            label={true}
            className={classes["checkout-input"]}
            type="text"
            name="address"
            id="address"
            labelText="Address"
          />
          {!formIsValid.address && (
            <p className={classes.errorParagraph}>Please provise an address</p>
          )}
        </div>
        <button className={classes["main-btn"]}>Check out</button>
      </div>
    </form>
  );
};
export default CheckOut;

import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCart.module.css";
import Cart from "../../assets/images/cart.svg";
import CartContext from "../../store/cart-context";

const HeaderCart = (props) => {
  const [btnIsAnimated, setBtnIsAnimated] = useState(false);
  // we used context not provider because we need only to read from it the number
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  // what is happenning -> the array might contain same item multiple times so to give me the correct amount
  const numOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsAnimated(true);

    const timer = setTimeout(() => {
      setBtnIsAnimated(false);
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const btcClass = `${classes.cartCount} ${
    btnIsAnimated ? classes["animate-btn"] : ""
  }`;
  return (
    <button onClick={props.onClick}>
      <div className={classes.cartIcon}>
        <img src={Cart} alt="" />
        <span className={btcClass}>{numOfCartItems}</span>
      </div>
    </button>
  );
};
export default HeaderCart;

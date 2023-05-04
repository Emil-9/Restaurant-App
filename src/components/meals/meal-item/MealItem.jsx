import classes from "./MealItem.module.css";
import MealitemForm from "./MealItemForm";
import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  // on we click on the button the form will submit these data to the context
  // the function is only add items and we don't need description
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.mealListItem}>
      {/* <a href={"/item/" + props.name}> */}
      <div>
        <img src={props.imgSrc} alt={props.name} />
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p className={classes.itemPrice}>
          <span>{props.currency}</span>
          &nbsp;
          {props.price.toFixed(2)}
        </p>
        <MealitemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
      {/* </a> */}
    </li>
  );
};
export default MealItem;

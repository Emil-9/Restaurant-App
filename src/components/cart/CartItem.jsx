import classes from "./CartItem.module.css";
const CartItem = (props) => {
  return (
    <>
      <li className={props.className}>
        {props.name}
        <span>{props.amount}</span>
        <span>{props.price}</span>
        <div className={classes["d-flex"]}>
          <button className={classes["add-button"]} onClick={props.onRemove}>
            -
          </button>
          <button className={classes["add-button"]} onClick={props.onAdd}>
            +
          </button>
        </div>
      </li>
      <hr />
    </>
  );
};
export default CartItem;

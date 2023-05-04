import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
import Spinner from "../UI/Spinner";
import MessageModal from "../UI/MessageModal";
import DeliveryImg from "../../assets/images/delivery.png";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const checkoutHandler = () => {
    setIsCheckout(true);
  };
  const cartItems = (
    <ul key={Math.random()} className={classes["cart-items-list"]}>
      {cartCtx.items.map((e) => (
        <CartItem
          className={classes.cartItem}
          key={Math.random()}
          name={e.name}
          amount={e.amount}
          price={e.price}
          onRemove={cartItemRemoveHandler.bind(null, e.id)}
          onAdd={cartItemAddHandler.bind(null, e)}
        />
      ))}
    </ul>
  );

  // this function is passed from the child component checkout.jsx -> we are getting the data here
  // we nned to submit these data to the server using fetch method
  const confirmOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-movies-aadfb-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userInfo: userData, // this is the person contact details
          orderedItems: cartCtx.items, // and this the ordered items
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartContent = (
    <>
      {cartItems}
      <div>
        <h3>Total Amount</h3>
        <span className={classes["total-price"]}>
          $ {cartCtx.totalAmount.toFixed(2)}
        </span>
      </div>
      {isCheckout && (
        <>
          <hr />
          <CheckOut onConfirmOrder={confirmOrderHandler} />
          <hr />
        </>
      )}
      <div className={classes.actionsContainer}>
        <button className={classes["cancel-btn"]} onClick={props.onCloseCart}>
          cancel
        </button>
        {hasItems && !isCheckout && (
          <button
            onClick={checkoutHandler}
            key={Math.random()}
            className={classes["main-btn"]}
          >
            Order
          </button>
        )}
      </div>
    </>
  );

  const isSubmittingContent = <Spinner />;

  const hasSubmittedContent = (
    <>
      <MessageModal>Order Sent Successfully</MessageModal>
      <div className={classes.centerd}>
        <img
          className={classes.deliveryImg}
          src={DeliveryImg}
          alt="deliveryImage"
        />
        <h1>Ordered Successfully</h1>
        <button className={classes["main-btn"]} onClick={props.onCloseCart}>
          Done
        </button>
      </div>
    </>
  );
  return (
    <Modal onCloseCart={props.onCloseCart} className={classes.cartTotal}>
      {!isSubmitting && !didSubmit && cartContent}
      {isSubmitting && isSubmittingContent}
      {didSubmit && !isSubmitting && hasSubmittedContent}
    </Modal>
  );
};
export default Cart;

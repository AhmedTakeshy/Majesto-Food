import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { cartActions } from "../../store/cart-slice";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import CartForm from "./CartForm";

const Cart = (props) => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };
  const cartItems = useSelector((state) => state.cart.items);
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cartAmountFixed = cartAmount.toFixed(2);
  const hasItems = cartQuantity > 0;

  const CartItems = (
    <ul className={styles["cart-items"]}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          title={item.title}
          quantity={item.quantity}
          price={item.price}
        />
      ))}
    </ul>
  );

  const SubmitUserData = async (userData) => {
    setIsSending(true);
    setIsSubmitted(false);
    const res = await fetch(
      "https://reactmeals-d6e34-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartItems,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong!!");
    }

    setIsSending(false);
    setIsSubmitted(true);
    dispatch(cartActions.reset());
  };

  const CartFormHandler = () => {
    setIsCheckout(true);
  };

  const cartModalContent = (
    <>
      {CartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{cartAmountFixed}</span>
      </div>
      {isCheckout ? (
        <CartForm onConfirm={SubmitUserData} onCancel={toggleCartHandler} />
      ) : (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={toggleCartHandler}>
            Close
          </button>
          {hasItems && (
            <button className={styles.button} onClick={CartFormHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const sendingMessage = <p>Sending order data...</p>;
  const submittedMessage = (
    <>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={toggleCartHandler}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal>
      {!isSending && !isSubmitted && cartModalContent}
      {isSending && sendingMessage}
      {isSubmitted && !isSending && submittedMessage}
    </Modal>
  );
};

export default Cart;

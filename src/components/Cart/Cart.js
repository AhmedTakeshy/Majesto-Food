import React, { useContext, useState } from "react";

import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import CartForm from "./CartForm";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const CartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
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
          orderItems: cartCtx.items,
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
    cartCtx.reset();
  };

  const CartFormHandler = () => {
    setIsCheckout(true);
  };

  const cartModalContent = (
    <>
      {CartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <CartForm onConfirm={SubmitUserData} onCancel={props.onHideCart} />
      ) : (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onHideCart}>
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
        <button className={styles.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!isSending && !isSubmitted && cartModalContent}
      {isSending && sendingMessage}
      {isSubmitted && !isSending && submittedMessage}
    </Modal>
  );
};

export default Cart;

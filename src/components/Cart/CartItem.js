import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import styles from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const dispatch = useDispatch();

  const addHandler = () => {
    console.log(props.id, props.title, props.price);
    dispatch(
      cartActions.addItem({
        id: props.id,
        title: props.title,
        price: props.price,
        quantity: props.quantity,
      })
    );
  };
  const removeHandler = () => {
    dispatch(cartActions.removeItem(props.id));
  };

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.title}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x {props.quantity}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={removeHandler}>−</button>
        <button onClick={addHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;

import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const dispatch = useDispatch();

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        title: props.title,
        quantity: amount,
        price: props.price,
      })
    );
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.title}</h3>
        <p className={styles.description}>{props.description}</p>
        <p className={styles.price}>{price}</p>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;

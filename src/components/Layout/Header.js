import React from "react";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import styles from "./Header.module.css";
import CartButton from "../Cart/CartButton";
import ImageMeal from "../../assets/meals.jpg";

const Header = (props) => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <>
      <header className={styles.header}>
        <h1>Majesto Food</h1>
        <CartButton onClick={toggleCartHandler}>Cart</CartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={ImageMeal} alt="Majesto Food" />
      </div>
    </>
  );
};

export default Header;

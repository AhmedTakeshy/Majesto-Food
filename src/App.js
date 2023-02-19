import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

let loadedTimes = 1;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (loadedTimes <= 2) {
      loadedTimes++;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {});

  return (
    <>
      {cartIsVisible && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;

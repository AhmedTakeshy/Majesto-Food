import React, { useState } from "react";

import CartProvider from "./store/CartProvider";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [cartStatus, setCartStatus] = useState(false);

  const ShowCartHandler = () => {
    setCartStatus(true);
  };

  const HideCartHandler = () => {
    setCartStatus(false);
  };
  return (
    <CartProvider>
      {cartStatus && <Cart onHideCart={HideCartHandler} />}
      <Header onShowCart={ShowCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import CartProvider from "./store/CartProvidor";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const closeCartHandler = () => {
    setCartIsShown(false);
  };
  const openCartHandler = () => {
    setCartIsShown(true);
  };
  return (
    <div className="App">
      <CartProvider>
      {/* needs access to the cart provider  */}
      {cartIsShown && <Cart onCloseCart={closeCartHandler} />}
      {/* needs access to the cart provider  */}
      <Header onShowCart={openCartHandler} />
      <main>
        {/* needs access to the cart provider  */}
        <Meals />
      </main>
      </CartProvider>
    </div>
  );
}

export default App;

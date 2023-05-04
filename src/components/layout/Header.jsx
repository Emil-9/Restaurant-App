import React from "react";
import classes from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import HeaderCart from "./HeaderCart";
const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes["headerContainer"]}>
        <a href="/">
          <img className={classes["headerLogo"]} src={logo} alt="header logo" />
        </a>
        <nav>
          <ul className={classes["listMenu"]}>
            <li className={classes.offersItem}>
              <a href="/">Offers</a>
            </li>
            <li>
              <a href="/">Categories</a>
            </li>
            <li>
              <a href="/">Profile</a>
            </li>
          </ul>
        </nav>
        <HeaderCart onClick={props.onShowCart}/>
      </div>
    </header>
  );
};
export default Header;

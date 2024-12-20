import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import React from "react";

type propsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<propsType> = (props) => {
  return (
    <header className={classes.header}>
      <img
        src="https://www.pngmart.com/files/7/Core-PNG-Picture.png"
        className={classes.img}
        alt="img"/>
      <div className={classes.login}>
        {props.isAuth ? (
          <div>
            {props.login} <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;

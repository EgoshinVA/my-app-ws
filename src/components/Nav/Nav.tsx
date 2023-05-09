import classes from './Nav.module.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink
          to="/profile"
          className={(navData) =>
            navData.isActive ? classes.active : classes.item
          }
        >
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <a href="##">News</a>
      </div>
      <div className={classes.item}>
        <NavLink
          to="/dialogs"
          className={(navData) =>
            navData.isActive ? classes.active : classes.item
          }
        >
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <a href="##">Music</a>
      </div>
      <div className={classes.item}>
        <a href="##">Settings</a>
      </div>
      <div className={classes.item}>
        <NavLink
          to="/users"
          className={(navData) =>
            navData.isActive ? classes.active : classes.item
          }
        >
          Users
        </NavLink>
      </div>
    </nav>
  );
};
export default Nav;

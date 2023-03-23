import classes from './Interlocutor.module.css';
import { NavLink } from 'react-router-dom';

const Interlocutor = (props) => {
  return (
    <div className={classes.interlocutor}>
      <div className={classes.circle}></div>
      <NavLink
        className={(navData) =>
          navData.isActive ? classes.active : classes.name
        }
        to={'/dialogs/' + props.id}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default Interlocutor;

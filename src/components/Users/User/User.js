import { NavLink } from 'react-router-dom';
import classes from './User.module.css';

let User = (props) => {

  return (
    <div className={classes.user}>
      <div>
        <NavLink to={'/profile/' + props.id}>
            {props.photo ? <img src={props.photo} className={classes.photo}/> : <div className={classes.circle}></div>}


        </NavLink>
        {props.followed}
      </div>
      <div className={classes.info}>
        <div className={classes.fullname}>{props.name}</div>
        <div className={classes.status}>{props.status}</div>
      </div>
    </div>
  );
};

export default User;

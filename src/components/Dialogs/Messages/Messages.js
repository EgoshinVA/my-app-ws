import classes from './Messages.module.css';

const Messages = (props) => {
  return (
    <div className={classes.message}>
      <div className={classes.item}>
        <div>
          <div className={classes.circle}></div>
          <div className={classes.name}>{props.name}</div>
        </div>
        <div className={classes.desc}>{props.message}</div>
      </div>
    </div>
  );
};

export default Messages;

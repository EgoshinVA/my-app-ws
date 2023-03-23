import Preloader from '../../common/Preloader/Preloader';
import classes from './Page.module.css';
import StatusProfileWithHooks from './StatusProfileWithHooks';

const Page = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <>
      <div className={classes.page}>
        <div>
          <img
            src={props.profile.photos.large}
            className={classes.avatar}
            alt="img"
          />
        </div>

        <div className={classes.info}>
          <p className={classes.name}>{props.profile.fullName}</p>
          <p className={classes.info_item}>Date of birth</p>
          <p className={classes.info_item}>City</p>
          <p className={classes.info_item}>Education</p>
          <p className={classes.info_item}>Web-site</p>
        </div>
      </div>
      <StatusProfileWithHooks
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
    </>
  );
};

export default Page;

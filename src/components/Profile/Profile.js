import classes from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';
import Page from './Page/Page';

const Profile = (props) => {
  return (
    <div className={classes.profile}>
      <img
        src="https://kartinkin.net/pics/uploads/posts/2022-08/1660786584_6-kartinkin-net-p-tragichnii-fon-krasivo-7.jpg"
        className={classes.back_img}
        alt="img"
      />
      <Page
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        setProfile={props.setProfile}
      />
      <PostsContainer />
    </div>
  );
};

export default Profile;

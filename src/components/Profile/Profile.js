import classes from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';
import Page from './Page/Page';

const Profile = (props) => {
  return (
    <div className={classes.profile}>
      <img
        src="https://phonoteka.org/uploads/posts/2021-04/1619251033_16-phonoteka_org-p-krasivii-chernii-fon-dlya-fotoshopa-21.jpg"
        className={classes.back_img}
        alt="img"
      />
      <Page
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <PostsContainer />
    </div>
  );
};

export default Profile;

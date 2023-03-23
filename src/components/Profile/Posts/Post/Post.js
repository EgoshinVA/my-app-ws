import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div className={classes.post}>
      <div className={classes.circle}></div>
      <p className={classes.desc}>{props.desc}</p>
      <div className={classes.like_block}>
        <div className={classes.likes}>Likes: {props.likes}</div>
        <a href="">
          <img
            className={classes.likes_img}
            href="#"
            src="https://png-library.net/new_gallery/9-92707_like-thumbs-up-comments-facebook-thumbs-up-icons.png"
          />
        </a>
      </div>
    </div>
  );
};

export default Post;

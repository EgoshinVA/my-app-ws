import classes from './Posts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/Controls/FormsControls';
import { requiredField} from "../../../utils/validators/validators";

const Posts = (props) => {
  let postElements = props.post.map((post) => (
    <Post key={post.id} desc={post.desc} likes={post.likes} />
  ));

  const addNewPost = (values) => {
    props.addPost(values.newPostInput);
  };

  return (
    <div className={classes.posts}>
      <div className={classes.posts_block}>
        <h2 className={classes.posts_title}>My posts</h2>
      </div>
      <div className={classes.post_items}>{postElements}</div>
      <AddNewPostFormRedux onSubmit={addNewPost} />
    </div>
  );
};

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newPostInput"
        placeholder="Your news..."
        className={classes.posts_input}
        validate={[requiredField]}
      />
      <button className={classes.posts_btn}>Send</button>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({form: 'AddNewPostForm'})(
  AddNewPostForm
);

export default Posts;

import classes from './Posts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import {
  requiredField,
  maxLengthCreator,
} from '../../../utils/validators/validators';
import { Textarea } from '../../common/Controls/FormsControls';

const Posts = (props) => {
  let postElements = props.post.map((post) => (
    <Post desc={post.desc} likes={post.likes} />
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
    <Form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newPostInput"
        placeholder="Your news..."
        className={classes.posts_input}
        validate={[requiredField, maxLengthCreator(30)]}
      />
      <button className={classes.posts_btn}>Send</button>
    </Form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: 'AddNewPostForm' })(
  AddNewPostForm
);

export default Posts;

import Posts from './Posts';
import { addPostActionCreator } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    post: state.profilePage.postData,
    inputValue: state.profilePage.inputValue,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostInput) => {
      dispatch(addPostActionCreator(newPostInput));
    },
  };
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;

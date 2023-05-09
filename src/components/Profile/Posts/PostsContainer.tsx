import Posts from './Posts';
import {profileActions, postDataType} from '../../../redux/profile-reducer';
import { connect } from 'react-redux';
import {appStateType} from "../../../redux/redux-store";

type mapStatePropsType = {
  post: Array<postDataType>
}
type mapDispatchPropsType = {
  addPost: (values: string) => void
}

type ownProps = {}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
  return {
    post: state.profilePage.postData,
  };
};

const PostsContainer = connect<mapStatePropsType, mapDispatchPropsType, ownProps, appStateType>(mapStateToProps, {addPost: profileActions.addPost})(Posts);

export default PostsContainer;

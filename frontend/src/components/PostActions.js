import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CardActions } from 'material-ui/Card';
import { putVoteScorePost, deletePost, getPostComments } from '../actions';
import PostForm from './PostForm';
import DisplayVoteScore from './DisplayVoteScore';
import DisplayCommentCount from './DisplayCommentCount';
import ActionLike from './ActionLike';
import ActionDislike from './ActionDislike';
import ActionDeleteItem from './ActionDeleteItem';
import ActionViewItem from './ActionViewItem';

const PostActions = props => (
  <CardActions>
    <DisplayVoteScore voteScore={props.post.voteScore} />
    <DisplayCommentCount commentCount={props.post.commentCount} />
    <ActionLike action={() => props.putVoteScorePost(props.post.id, 'upVote')} />
    <ActionDislike action={() => props.putVoteScorePost(props.post.id, 'downVote')} />
    <ActionViewItem
      containerElement={<Link to={`/${props.post.category}/${props.post.id}`}></Link>}
      disabled={props.viewDetailsDisabled}
    />
    <PostForm addItem={false} post={props.post} />
    <ActionDeleteItem
      action={() => props.deletePost(props.post.id)}
      containerElement={<Link to={`/${props.defaultCategory === props.currentCategory ? '' : props.post.category}`}></Link>}
    />
  </CardActions>
);

PostActions.propTypes = {
  putVoteScorePost: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  defaultCategory: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  viewDetailsDisabled: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  putVoteScorePost: (postId, option) => dispatch(putVoteScorePost(postId, option)),
  deletePost: postId => dispatch(deletePost(postId)),
  getPostComments: postId => dispatch(getPostComments(postId)),
});

const mapStateToProps = state => ({
  currentCategory: state.ui.currentCategory,
  defaultCategory: state.ui.defaultCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostActions);

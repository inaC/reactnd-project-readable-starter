import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionStars from 'material-ui/svg-icons/action/stars';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';
import { putVoteScorePost, deletePost, getPostComments } from '../actions';
import PostForm from './PostForm';

const PostActions = props => (
  <CardActions>
    <IconButton tooltip={`Vote score: ${props.post.voteScore}`} style={{ cursor: 'initial' }} disableTouchRipple>
      <ActionStars />
    </IconButton>
    <IconButton tooltip={`Comments: ${props.post.commentCount}`} style={{ cursor: 'initial' }} disableTouchRipple>
      <CommunicationForum />
    </IconButton>
    <IconButton
      tooltip="Like"
      onClick={() => props.putVoteScorePost(props.post.id, 'upVote')}
    >
      <ActionThumbUp color="limegreen" />
    </IconButton>
    <IconButton
      tooltip="Dislike"
      onClick={() => props.putVoteScorePost(props.post.id, 'downVote')}
    >
      <ActionThumbDown color="red" />
    </IconButton>
    <IconButton
      tooltip="View"
      containerElement={<Link to={`/${props.post.category}/${props.post.id}`}></Link>}
      disabled={props.viewDetailsDisabled}
    >
      <ActionVisibility color="mediumpurple" />
    </IconButton>
    <PostForm addItem={false} post={props.post} />
    <IconButton
      tooltip="Delete"
      onClick={() => props.deletePost(props.post.id)}
      containerElement={<Link to={`/${props.defaultCategory === props.currentCategory ? '' : props.post.category}`}></Link>}
    >
      <ActionDelete color="brown" />
    </IconButton>
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

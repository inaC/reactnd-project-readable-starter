import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionStars from 'material-ui/svg-icons/action/stars';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { putVoteScoreComment, deleteComment } from '../actions';
import CommentForm from './CommentForm';

const CommentActions = props => (
  <CardActions>
    <IconButton tooltip={`Vote score: ${props.comment.voteScore}`} style={{ cursor: 'initial' }} disableTouchRipple>
      <ActionStars />
    </IconButton>
    <IconButton
      tooltip="Like"
      onClick={() => props.putVoteScoreComment(props.comment.id, 'upVote')}
    >
      <ActionThumbUp color="limegreen" />
    </IconButton>
    <IconButton
      tooltip="Dislike"
      onClick={() => props.putVoteScoreComment(props.comment.id, 'downVote')}
    >
      <ActionThumbDown color="red" />
    </IconButton>
    <CommentForm addItem={false} comment={props.comment} parentId={props.comment.parentId}/>
    <IconButton
      tooltip="Delete"
      onClick={() => props.deleteComment(props.comment.id)}
    >
      <ActionDelete color="brown" />
    </IconButton>
  </CardActions>
);

CommentActions.propTypes = {
  putVoteScoreComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  putVoteScoreComment: (commentId, option) => dispatch(putVoteScoreComment(commentId, option)),
  deleteComment: commentId => dispatch(deleteComment(commentId)),
});

export default connect(null, mapDispatchToProps)(CommentActions);

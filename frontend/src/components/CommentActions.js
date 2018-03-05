import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import { putVoteScoreComment, deleteComment } from '../actions';
import CommentForm from './CommentForm';
import DisplayVoteScore from './DisplayVoteScore';
import ActionLike from './ActionLike';
import ActionDislike from './ActionDislike';
import ActionDeleteItem from './ActionDeleteItem';

const CommentActions = props => (
  <CardActions>
    <DisplayVoteScore voteScore={props.comment.voteScore} />
    <ActionLike action={() => props.putVoteScoreComment(props.comment.id, 'upVote')} />
    <ActionDislike action={() => props.putVoteScoreComment(props.comment.id, 'downVote')} />
    <CommentForm addItem={false} comment={props.comment} parentId={props.comment.parentId} />
    <ActionDeleteItem action={() => props.deleteComment(props.comment.id)} />
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

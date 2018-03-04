import React, { Component } from 'react';
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

class CommentActions extends Component {
  static propTypes = {
    putVoteScoreComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
  }

  render() {
    return (
      <CardActions>
        <IconButton tooltip={`Vote score: ${this.props.comment.voteScore}`} style={{ cursor: 'initial' }} disableTouchRipple>
          <ActionStars />
        </IconButton>
        <IconButton
          tooltip="Like"
          onClick={() => this.props.putVoteScoreComment(this.props.comment.id, 'upVote')}
        >
          <ActionThumbUp color="limegreen" />
        </IconButton>
        <IconButton
          tooltip="Dislike"
          onClick={() => this.props.putVoteScoreComment(this.props.comment.id, 'downVote')}
        >
          <ActionThumbDown color="red" />
        </IconButton>
        <CommentForm addItem={false} comment={this.props.comment} parentId={this.props.comment.parentId}/>
        <IconButton
          tooltip="Delete"
          onClick={() => this.props.deleteComment(this.props.comment.id)}
        >
          <ActionDelete color="brown" />
        </IconButton>
      </CardActions>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  putVoteScoreComment: (commentId, option) => dispatch(putVoteScoreComment(commentId, option)),
  deleteComment: commentId => dispatch(deleteComment(commentId)),
});

export default connect(null, mapDispatchToProps)(CommentActions);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionStars from 'material-ui/svg-icons/action/stars';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { putVoteScorePost, deletePost } from '../actions';

class ItemActions extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    putVoteScorePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }

  render() {
    return (
      <CardActions>
        <IconButton tooltip={`Vote score: ${this.props.voteScore}`} style={{ cursor: 'initial' }} disableTouchRipple>
          <ActionStars />
        </IconButton>
        <IconButton tooltip={`Comments: ${this.props.commentCount}`} style={{ cursor: 'initial' }} disableTouchRipple>
          <CommunicationForum />
        </IconButton>
        <IconButton
          tooltip="Like"
          onClick={() => this.props.putVoteScorePost(this.props.id, 'upVote')}
        >
          <ActionThumbUp color="limegreen" />
        </IconButton>
        <IconButton
          tooltip="Dislike"
          onClick={() => this.props.putVoteScorePost(this.props.id, 'downVote')}
        >
          <ActionThumbDown color="red" />
        </IconButton>
        <IconButton tooltip="View">
          <ActionVisibility color="mediumpurple" />
        </IconButton>
        <IconButton tooltip="Edit">
          <EditorModeEdit color="darkorange" />
        </IconButton>
        <IconButton
          tooltip="Delete"
          onClick={() => this.props.deletePost(this.props.id)}
        >
          <ActionDelete color="brown" />
        </IconButton>
      </CardActions>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  putVoteScorePost: (postId, option) => dispatch(putVoteScorePost(postId, option)),
  deletePost: postId => dispatch(deletePost(postId)),
});

export default connect(null, mapDispatchToProps)(ItemActions);

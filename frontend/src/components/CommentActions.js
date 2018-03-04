import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionStars from 'material-ui/svg-icons/action/stars';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { putVoteScorePost, deletePost } from '../actions';
import FormModal from './FormModal';

class CommentActions extends Component {
  static propTypes = {
    putVoteScorePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
  }

  render() {
    return (
      <CardActions>
        <IconButton tooltip={`Vote score: ${this.props.post.voteScore}`} style={{ cursor: 'initial' }} disableTouchRipple>
          <ActionStars />
        </IconButton>
        <IconButton
          tooltip="Like"
          onClick={() => this.props.putVoteScorePost(this.props.post.id, 'upVote')}
        >
          <ActionThumbUp color="limegreen" />
        </IconButton>
        <IconButton
          tooltip="Dislike"
          onClick={() => this.props.putVoteScorePost(this.props.post.id, 'downVote')}
        >
          <ActionThumbDown color="red" />
        </IconButton>
        <FormModal addItem={false} post={this.props.post} />
        <IconButton
          tooltip="Delete"
          onClick={() => this.props.deletePost(this.props.post.id)}
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

export default connect(null, mapDispatchToProps)(CommentActions);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostComments } from '../actions';
import Comment from './Comment';
import CommentForm from './CommentForm';

class CommentList extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    getPostComments: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.comments.length === 0) this.props.getPostComments(this.props.postId);
  }

  render() {
    return (
      <div>
        {this.props.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        <div className="addItem">
          <CommentForm addItem parentId={this.props.postId} />
        </div>
      </div>
    );
  }
}

const getCommentsSorted = (comments, sortBy) => (
  Object.keys(comments || {}).map(id => comments[id]).sort((a, b) => b[sortBy] - a[sortBy])
);

const getComments = (comments, postId, sortBy) => {
  if (postId && comments) return getCommentsSorted(comments[postId], sortBy);
  return [];
};

const mapStateToProps = (state, ownProps) => ({
  comments: getComments(state.comments, ownProps.postId, state.ui.sortBy),
});

const mapDispatchToProps = dispatch => ({
  getPostComments: postId => dispatch(getPostComments(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);

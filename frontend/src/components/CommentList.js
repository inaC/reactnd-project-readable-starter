import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostComments } from '../actions';
import Comment from './Comment';

class CommentList extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    getPostComments: PropTypes.func.isRequired,
  }
  componentDidMount() {
    if (this.props.comments === null) this.props.getPostComments(this.props.postId);
  }

  render() {
    return (
      <div>
        {this.props.comments ? this.props.comments.map(comment => <Comment key={comment.id} comment={comment} />) : ''}
      </div>
    );
  }
}

const getComments = comments => Object.keys(comments || {}).map(id => comments[id]);

const mapStateToProps = (state, ownProps) => ({
  comments: ownProps.postId && state.comments ? getComments(state.comments[ownProps.postId]) : null,
});

const mapDispatchToProps = dispatch => ({
  getPostComments: postId => dispatch(getPostComments(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);

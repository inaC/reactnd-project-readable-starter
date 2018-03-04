import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import CommentActions from './CommentActions';
import './App.css';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="comment">
        <Card>
          <CardHeader title={this.props.comment.body} subtitle={`@${this.props.comment.author}`} />
          <CommentActions comment={this.props.comment} />
        </Card>
      </div>
    );
  }
}
export default Comment;


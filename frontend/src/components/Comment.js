import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import CommentActions from './CommentActions';
import './App.css';

const Comment = props => (
  <div className="comment">
    <Card>
      <CardHeader title={props.comment.body} subtitle={`@${props.comment.author}`} />
      <CommentActions comment={props.comment} />
    </Card>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;


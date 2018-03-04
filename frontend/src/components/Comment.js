import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { getPosts, setCategory } from '../actions';
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
          <CommentActions post />
        </Card>
      </div>
    );
  }
}
export default Comment;


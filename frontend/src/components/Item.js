import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import ItemActions from './ItemActions';

class Item extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }

  render() {
    return (
      <Card>
        <CardHeader title={this.props.title} subtitle={`@${this.props.author}`} />
        <ItemActions
          voteScore={this.props.voteScore}
          id={this.props.id}
          commentCount={this.props.commentCount}
        />
      </Card>
    );
  }
}

export default Item;

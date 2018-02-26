import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import ItemActions from './ItemActions';

class Item extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Card>
        <CardHeader title={this.props.post.title} subtitle={`@${this.props.post.author}`} />
        <ItemActions
          post={this.props.post}
        />
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.id],
});

export default connect(mapStateToProps)(Item);

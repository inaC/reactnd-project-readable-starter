import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { getPosts, setCategory } from '../actions';
import ItemActions from './ItemActions';
import paramTypePresent from '../util/urlParams';

class Item extends Component {
  static propTypes = {
    id: PropTypes.string,
    getPosts: PropTypes.func.isRequired,
    comments: PropTypes.object,
    post: PropTypes.object.isRequired,
    match: PropTypes.object,
    defaultCategory: PropTypes.string.isRequired,
    currentCategory: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.match && this.props.post.title === null) this.props.getPosts();
    if (paramTypePresent(this.props.match, 'category') && this.props.defaultCategory === this.props.currentCategory) {
      this.props.setCategory(this.props.match.params.category);
    }
  }

  renderBody = () => (<CardText> {this.props.post.body} </CardText>)

  render() {
    return (
      <Card>
        <CardHeader title={this.props.post.title} subtitle={`@${this.props.post.author}`} />
        { this.props.match ? this.renderBody() : null }
        <ItemActions post={this.props.post} />
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.posts ? state.posts[ownProps.match ? ownProps.match.params.post_id : ownProps.id] : { title: null, author: null },
  defaultCategory: state.ui.defaultCategory,
  currentCategory: state.ui.currentCategory,
  comments: ownProps.match && state.comments ? state.comments[ownProps.match.params.post_id] : {},
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts),
  setCategory: category => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);

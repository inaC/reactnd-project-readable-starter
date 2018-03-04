import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { getPosts, setCategory } from '../actions';
import ItemActions from './ItemActions';
import CommentList from './CommentList';
import paramTypePresent from '../util/urlParams';

class Item extends Component {
  static propTypes = {
    id: PropTypes.string,
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    match: PropTypes.object,
    defaultCategory: PropTypes.string.isRequired,
    currentCategory: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const propMatch = this.props.match;
    const propPost = this.props.post;

    if (propMatch && Object.keys(propPost).length === 0) this.props.getPosts();
    if (paramTypePresent(propMatch, 'category') && this.props.defaultCategory === this.props.currentCategory) {
      this.props.setCategory(propMatch.params.category);
    }
  }

  renderBody = () => (<CardText> {this.props.post.body} </CardText>)
  renderItem = () => {
    const { post, match } = this.props;
    const detailsPresent = paramTypePresent(match, 'category') && paramTypePresent(match, 'post_id');
    return (
      <div>
        <Card>
          <CardHeader title={post.title} subtitle={`@${post.author}`} />
          { match ? this.renderBody() : null }
          <ItemActions post={post} viewDetailsDisabled={!!detailsPresent} />
        </Card>
        {post.id && match ? <CommentList postId={post.id} /> : null}
      </div>
    );
  }
  render() {
    return this.props.post ? this.renderItem() : '';
  }
}

const getPostFromState = (posts, match, ownPropId) => (
  posts[match ? match.params.post_id : ownPropId]
);
const findPost = (posts, match, ownPropId) => (
  posts ? getPostFromState(posts, match, ownPropId) : {}
);

const mapStateToProps = (state, ownProps) => ({
  post: findPost(state.posts, ownProps.match, ownProps.id),
  defaultCategory: state.ui.defaultCategory,
  currentCategory: state.ui.currentCategory,
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts),
  setCategory: category => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);

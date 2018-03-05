import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { getPosts, setCategory, displayPost } from '../actions';
import PostActions from './PostActions';
import CommentList from './CommentList';
import paramTypePresent from '../util/urlParams';
import NotFound from './NotFound';
import './App.css';

class Post extends Component {
  static propTypes = {
    id: PropTypes.string,
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object,
    match: PropTypes.object,
    defaultCategory: PropTypes.string.isRequired,
    currentCategory: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
    displayPost: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const propMatch = this.props.match;
    const propPost = this.props.post;
    if (propMatch && Object.keys(propPost || {}).length === 0) this.props.getPosts();
    if (paramTypePresent(propMatch, 'category') && this.props.defaultCategory === this.props.currentCategory) {
      this.props.setCategory(propMatch.params.category);
    }
    if (paramTypePresent(propMatch, 'category') && paramTypePresent(propMatch, 'post_id')) {
      this.props.displayPost(true);
    }
  }

  postIdParamPresent = match => paramTypePresent(match, 'category') && paramTypePresent(match, 'post_id')
  renderNotFound = () => <NotFound />
  renderBody = () => <CardText> {this.props.post.body} </CardText>

  renderPost = (post, match, postIdParamPresent) => (
    <div>
      <Card>
        <CardHeader title={post.title} subtitle={`@${post.author}`} />
        { match ? this.renderBody() : null }
        <PostActions post={post} viewDetailsDisabled={!!postIdParamPresent} />
      </Card>
      {post.id && match ? <CommentList postId={post.id} /> : null}
    </div>
  );

  render() {
    const { post, match } = this.props;
    const postIdParamPresent = this.postIdParamPresent(match);
    const postNotFound = !!postIdParamPresent && Object.keys(post || {}).length === 0;
    return postNotFound ? this.renderNotFound() : this.renderPost(post, match, postIdParamPresent);
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
  displayPost: boolean => dispatch(displayPost(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

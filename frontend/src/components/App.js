import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionStars from 'material-ui/svg-icons/action/stars';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ApplicationBar from './ApplicationBar';
import './App.css';
import { getPosts } from '../actions';


class App extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        <ApplicationBar />
        <div className="body">
          {this.props.posts.map(post => (
            <div key={post.id} style={{ marginBottom: '20px' }}>
              <Card>
                <CardHeader title={post.title} subtitle={`@${post.author}`} />
                <CardActions>
                  <IconButton tooltip={`Vote score: ${post.voteScore}`} style={{ cursor: 'initial' }} disableTouchRipple>
                    <ActionStars />
                  </IconButton>
                  <IconButton tooltip={`Comments: ${post.commentCount}`} style={{ cursor: 'initial' }} disableTouchRipple>
                    <CommunicationForum />
                  </IconButton>
                  <IconButton tooltip="Like">
                    <ActionThumbUp color="limegreen" />
                  </IconButton>
                  <IconButton tooltip="Dislike">
                    <ActionThumbDown color="red" />
                  </IconButton>
                  <IconButton tooltip="View Post">
                    <ActionVisibility color="mediumpurple" />
                  </IconButton>
                  <IconButton tooltip="Edit Post">
                    <EditorModeEdit color="darkorange" />
                  </IconButton>
                  <IconButton tooltip="Delete Post">
                    <ActionDelete color="brown" />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          ))}
          <div style={{ textAlign: 'right' }}>
            <FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: Object.keys(state.posts || {}).map(postId => state.posts[postId]),
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

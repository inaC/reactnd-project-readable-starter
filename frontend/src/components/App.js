import AppBar from 'material-ui/AppBar';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionStars from 'material-ui/svg-icons/action/stars';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentSort from 'material-ui/svg-icons/content/sort';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, getCategories } from '../actions';
import './App.css';

class App extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    open: false,
    category: 'All',
    sortBy: 'voteScore',
  }
  componentDidMount() {
    this.props.dispatch(getPosts);
    this.props.dispatch(getCategories);
  }

  setCategory = category => this.setState({ category })
  setSortBy = type => this.setState({ sortBy: type })
  toggleDrawer = () => this.setState({ open: !this.state.open })

  render() {
    const sortByTypesDescription = { voteScore: 'Vote Score (biggest to lowest)', createdAt: 'Creation Date (newest to oldest)' };
    return (
      <div className="App">
        <AppBar
          title={`${this.state.category} posts`}
          iconElementLeft={<IconButton tooltip="Categories"><NavigationMenu /></IconButton>}
          iconElementRight={
            <IconMenu iconButtonElement={<IconButton tooltip="Sort by"><ContentSort /></IconButton>}>
              {Object.keys(sortByTypesDescription).map(type => (
                <MenuItem
                  key={type}
                  disabled={this.state.sortBy === type}
                  onClick={() => this.setSortBy(type)}
                  primaryText={sortByTypesDescription[type]}
                />
              ))}
            </IconMenu>
          }
          onLeftIconButtonClick={this.toggleDrawer}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          {this.props.categories.map(category => (
            <MenuItem
              key={category}
              onClick={() => this.setCategory(category)}
              disabled={this.state.category === category}
            > {category}
            </MenuItem>
           ))}
        </Drawer>
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
  categories: ['All'].concat(Object.keys(state.categories || {}).map(category => category[0].toUpperCase() + category.slice(1))),
  posts: Object.keys(state.posts || {}).map(postId => state.posts[postId]),
});

export default connect(mapStateToProps)(App);

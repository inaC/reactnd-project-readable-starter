import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { insertPost } from '../actions';

class FormModal extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    insertPost: PropTypes.func.isRequired,
  }

  state = {
    open: false,
    post: {
      id: '',
      timestamp: '',
      title: '',
      body: '',
      author: '',
      category: 0,
    },
  }

  setPost = (state, attribute, value) => (
    {
      ...state,
      post: {
        ...state.post,
        [attribute]: value,
      },
    })

  setCategory = (event, index, value) => this.setState(state => this.setPost(state, 'category', value))
  setTitle = (event, value) => this.setState(state => this.setPost(state, 'title', value))
  setBody = (event, value) => this.setState(state => this.setPost(state, 'body', value))
  setAuthor = (event, value) => this.setState(state => this.setPost(state, 'author', value))
  openModal = () => this.setState({ open: true })
  closeModal = () => this.setState({ open: false })

  resetForm = () => {
    const postResetted = Object.assign({}, this.state.post);
    postResetted.id = '';
    postResetted.timestamp = '';
    postResetted.title = '';
    postResetted.body = '';
    postResetted.author = '';
    postResetted.category = 0;
    this.setState({ post: postResetted });
  }

  submitForm = () => {
    const postToCreate = Object.assign({}, this.state.post);
    postToCreate.id = Date.now().toString();
    postToCreate.timestamp = postToCreate.id;
    postToCreate.category = this.props.categories[postToCreate.category];
    this.props.insertPost(postToCreate);
    this.closeForm();
  }

  closeForm = () => {
    this.resetForm();
    this.closeModal();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.closeForm}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.submitForm}
      />,
    ];

    return (
      <div>
        <FloatingActionButton label="Scrollable Dialog" onClick={this.openModal}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add post"
          actions={actions}
          autoScrollBodyContent
          fullWidth
          open={this.state.open}
          onRequestClose={this.closeModal}
        >
          <TextField
            floatingLabelText="Title"
            rows={2}
            fullWidth
            onChange={this.setTitle}
          />
          <TextField
            floatingLabelText="Author"
            rows={2}
            fullWidth
            onChange={this.setAuthor}
          />
          <TextField
            floatingLabelText="Body"
            fullWidth
            multiLine
            rows={2}
            rowsMax={5}
            onChange={this.setBody}
          />
          <SelectField
            value={this.state.post.category}
            floatingLabelText="Select Category"
            onChange={this.setCategory}
          >
            {this.props.categories.map((category, index) => (
              <MenuItem
                value={index}
                key={category}
                primaryText={category}
              />))}
          </SelectField>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: Object.keys(state.categories || {}),
});

const mapDispatchToProps = dispatch => ({
  insertPost: post => dispatch(insertPost(post)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FormModal);

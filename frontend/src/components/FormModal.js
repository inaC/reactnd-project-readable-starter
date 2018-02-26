import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { insertPost, updatePost } from '../actions';
import './FormModal.css';

class FormModal extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    insertPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    addItem: PropTypes.bool.isRequired,
    post: PropTypes.object,
  }

  state = {
    open: false,
    post: {
      id: this.props.addItem ? '' : this.props.post.id,
      timestamp: this.props.addItem ? '' : this.props.post.timestamp,
      title: this.props.addItem ? '' : this.props.post.title,
      body: this.props.addItem ? '' : this.props.post.body,
      author: this.props.addItem ? '' : this.props.post.author,
      category: this.props.addItem ? 0 : this.props.categories.indexOf(this.props.post.category),
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
    if (this.props.addItem) this.props.insertPost(postToCreate);
    else {
      const { title, body } = this.state.post;
      this.props.updatePost(this.state.post.id, { title, body });
    }
    this.closeForm();
  }

  closeForm = () => {
    if (this.props.addItem) this.resetForm();
    this.closeModal();
  }

  retrieveAddButom = () => (
    <FloatingActionButton onClick={this.openModal}>
      <ContentAdd />
    </FloatingActionButton>
  )
  retrieveEditButom = () => (
    <IconButton tooltip="Edit" onClick={this.openModal}>
      <EditorModeEdit color="darkorange" />
    </IconButton>
  )
  determineFormIconButton = () => (
    this.props.addItem ? this.retrieveAddButom() : this.retrieveEditButom()
  )

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
      <div className="modal">
        {this.determineFormIconButton()}
        <Dialog
          title={this.props.addItem ? 'Add post' : 'Edit post'}
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
            defaultValue={this.state.post.title}
            onChange={this.setTitle}
          />
          <TextField
            floatingLabelText="Author"
            rows={2}
            fullWidth
            disabled={!this.props.addItem}
            defaultValue={this.state.post.author}
            onChange={this.setAuthor}
          />
          <TextField
            floatingLabelText="Body"
            fullWidth
            multiLine
            rows={2}
            rowsMax={5}
            defaultValue={this.state.post.body}
            onChange={this.setBody}
          />
          <SelectField
            value={this.state.post.category}
            disabled={!this.props.addItem}
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
  updatePost: (id, post) => dispatch(updatePost(id, post)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FormModal);

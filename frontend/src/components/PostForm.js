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
import './App.css';

class PostForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    currentCategory: PropTypes.string.isRequired,
    defaultCategory: PropTypes.string.isRequired,
    insertPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    addItem: PropTypes.bool.isRequired,
    post: PropTypes.object,
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
    blank_fields: {
      title: true,
      body: true,
      author: true,
      category: false,
    },
  }

  setPost = (state, attribute, value, emptyValue) => (
    {
      ...state,
      post: {
        ...state.post,
        [attribute]: value,
      },
      blank_fields: {
        ...state.blank_fields,
        [attribute]: value === emptyValue,
      },
    })

  setInitialCategory = () => {
    if (!this.props.addItem) return this.props.post.category;
    if (this.isCurrentCategoryDefault()) return this.props.categories[0];
    return this.props.currentCategory;
  }

  setInitialStateOnOpen = () => ({
    open: true,
    post: {
      id: this.props.addItem ? '' : this.props.post.id,
      timestamp: this.props.addItem ? '' : this.props.post.timestamp,
      title: this.props.addItem ? '' : this.props.post.title,
      body: this.props.addItem ? '' : this.props.post.body,
      author: this.props.addItem ? '' : this.props.post.author,
      category: this.props.categories.indexOf(this.setInitialCategory()),
    },
    blank_fields: {
      title: this.props.addItem,
      body: this.props.addItem,
      author: this.props.addItem,
      category: this.props.categories.indexOf(this.setInitialCategory()) < 0,
    },
  })

  setCategory = (event, index, value) => this.setState(state => this.setPost(state, 'category', value, -1))
  setTitle = (event, value) => this.setState(state => this.setPost(state, 'title', value.trim(), ''))
  setBody = (event, value) => this.setState(state => this.setPost(state, 'body', value.trim(), ''))
  setAuthor = (event, value) => this.setState(state => this.setPost(state, 'author', value.trim(), ''))
  isCurrentCategoryDefault = () => this.props.currentCategory === this.props.defaultCategory
  openModal = () => this.setState(this.setInitialStateOnOpen())
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

  displayErrorText = isValueEmpty => (isValueEmpty ? 'This field is required' : null)

  requiredFieldsEmpty = () => {
    const { title, body, author, category } = this.state.blank_fields;
    return (title || body || author || category);
  }

  submitForm = () => {
    const postToCreate = Object.assign({}, this.state.post);
    const currentTime = Date.now();
    postToCreate.id = currentTime.toString();
    postToCreate.timestamp = currentTime;
    postToCreate.category = this.props.categories[postToCreate.category];
    if (this.props.addItem && !this.requiredFieldsEmpty()) this.props.insertPost(postToCreate);
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
        disabled={this.requiredFieldsEmpty()}
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
          repositionOnUpdate={false}
        >
          <TextField
            floatingLabelText="Title"
            rows={2}
            fullWidth
            defaultValue={this.state.post.title}
            onChange={this.setTitle}
            errorText={this.displayErrorText(this.state.blank_fields.title)}
          />
          <TextField
            floatingLabelText="Author"
            rows={2}
            fullWidth
            disabled={!this.props.addItem}
            defaultValue={this.state.post.author}
            onChange={this.setAuthor}
            errorText={this.displayErrorText(this.state.blank_fields.author)}
          />
          <TextField
            floatingLabelText="Body"
            fullWidth
            multiLine
            rows={3}
            rowsMax={3}
            defaultValue={this.state.post.body}
            onChange={this.setBody}
            errorText={this.displayErrorText(this.state.blank_fields.body)}
          />
          <SelectField
            value={this.state.post.category}
            disabled={!this.props.addItem || !this.isCurrentCategoryDefault()}
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
  currentCategory: state.ui.currentCategory,
  defaultCategory: state.ui.defaultCategory,
});

const mapDispatchToProps = dispatch => ({
  insertPost: post => dispatch(insertPost(post)),
  updatePost: (id, post) => dispatch(updatePost(id, post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

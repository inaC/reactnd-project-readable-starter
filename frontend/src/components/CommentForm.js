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
import { insertComment, updateComment } from '../actions';
import './App.css';

class CommentForm extends Component {
  static propTypes = {
    insertComment: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    addItem: PropTypes.bool.isRequired,
    parentId: PropTypes.string.isRequired,
    comment: PropTypes.object,
  }

  state = {
    open: false,
    comment: {
      id: '',
      timestamp: '',
      body: '',
      author: '',
      parentId: '',
    },
  }

  setComment = (state, attribute, value) => (
    {
      ...state,
      comment: {
        ...state.comment,
        [attribute]: value,
      },
    })

  setInitialStateOnOpen = () => ({
    open: true,
    comment: {
      id: this.props.addItem ? '' : this.props.comment.id,
      timestamp: this.props.addItem ? '' : this.props.comment.timestamp,
      body: this.props.addItem ? '' : this.props.comment.body,
      author: this.props.addItem ? '' : this.props.comment.author,
      parentId: this.props.parentId,
    },
  })

  setBody = (event, value) => this.setState(state => this.setComment(state, 'body', value))
  setAuthor = (event, value) => this.setState(state => this.setComment(state, 'author', value))
  openModal = () => this.setState(this.setInitialStateOnOpen())
  closeModal = () => this.setState({ open: false })

  resetForm = () => {
    const commentResetted = Object.assign({}, this.state.comment);
    commentResetted.id = '';
    commentResetted.timestamp = '';
    commentResetted.body = '';
    commentResetted.author = '';
    this.setState({ comment: commentResetted });
  }

  submitForm = () => {
    const commentToCreate = Object.assign({}, this.state.comment);
    const timestamp = Date.now();
    commentToCreate.id = timestamp.toString();
    commentToCreate.timestamp = timestamp;
    if (this.props.addItem) this.props.insertComment(commentToCreate);
    else {
      const { body } = this.state.comment;
      this.props.updateComment(this.state.comment.id, { body, timestamp });
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
          title={this.props.addItem ? 'Add comment to post' : 'Edit comment'}
          actions={actions}
          autoScrollBodyContent
          fullWidth
          open={this.state.open}
          onRequestClose={this.closeModal}
        >
          <TextField
            floatingLabelText="Author"
            rows={2}
            fullWidth
            disabled={!this.props.addItem}
            defaultValue={this.state.comment.author}
            onChange={this.setAuthor}
          />
          <TextField
            floatingLabelText="Body"
            fullWidth
            multiLine
            rows={3}
            rowsMax={5}
            defaultValue={this.state.comment.body}
            onChange={this.setBody}
          />
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  insertComment: comment => dispatch(insertComment(comment)),
  updateComment: (id, comment) => dispatch(updateComment(id, comment)),
});

export default connect(null, mapDispatchToProps)(CommentForm);

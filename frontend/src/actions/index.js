import * as api from '../util/api';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SORT_BY_TYPE = 'SET_SORT_BY_TYPE';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const UPDATE_VOTE_SCORE_POST = 'UPDATE_VOTE_SCORE_POST';
export const UPDATE_VOTE_SCORE_COMMENT = 'UPDATE_VOTE_SCORE_COMMENT';
export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const fromResponseToObject = (response, type, valueToStore = null, typeUnique = true, sortBy = []) => (
  Object.keys(response).reduce((accumulator, index) => {
    const auxAccumulator = Object.assign(accumulator);
    const element = response[index];
    const value = valueToStore ? element[valueToStore] : element;
    if (typeUnique) auxAccumulator[element[type]] = value;
    else {
      if (!auxAccumulator[element[type]]) auxAccumulator[element[type]] = {};
      auxAccumulator[element[type]][value] = { [valueToStore]: value };
      for (const index in sortBy) {
        const sortByType = sortBy[index];
        auxAccumulator[element[type]][value][sortByType] = element[sortByType];
      }
    }

    return auxAccumulator;
  }, {})
);

export const addPost = (post) => ({
  type: ADD_POST,
  post,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const editPost = (post) => ({
  type: EDIT_POST,
  post,
});

export const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts: fromResponseToObject(posts, 'id'),
  postsByCategory: fromResponseToObject(posts, 'category', 'id', false, ['voteScore', 'timestamp']),
});

export const receivePostComments = (postId, comments) => ({
  type: RECEIVE_POST_COMMENTS,
  postId,
  comments: fromResponseToObject(comments, 'id'),
});

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories: fromResponseToObject(categories, 'name', 'path'),
});

export const setCategory = category => ({
  type: SET_CATEGORY,
  category,
});

export const setSortByType = sortType => ({
  type: SET_SORT_BY_TYPE,
  sortBy: sortType,
});

export const toggleSideBar = boolean => ({
  type: TOGGLE_SIDEBAR,
  sideBarOpen: boolean,
});

export const updateVoteScorePost = post => ({
  type: UPDATE_VOTE_SCORE_POST,
  post,
});

export const updateVoteScoreComment = comment => ({
  type: UPDATE_VOTE_SCORE_COMMENT,
  comment,
});

export const removePost = post => ({
  type: REMOVE_POST,
  postId: post.id,
});

export const removeComment = comment => ({
  type: REMOVE_COMMENT,
  postId: comment.parentId,
  commentId: comment.id,
});

export const getPosts = dispatch => (
  api.fetchPosts().then(posts => dispatch(receivePosts(posts)))
);

export const getPostComments = postId => dispatch => (
  api.fetchPostComments(postId).then(comments => dispatch(receivePostComments(postId, comments)))
);

export const getCategories = dispatch => (
  api.fetchCategories().then(categories => dispatch(receiveCategories(categories)))
);

export const putVoteScorePost = (postId, option) => dispatch => (
  api.votePost(postId, option).then(post => dispatch(updateVoteScorePost(post)))
);

export const putVoteScoreComment = (commentId, option) => dispatch => (
  api.voteComment(commentId, option).then(comment => dispatch(updateVoteScoreComment(comment)))
);

export const deletePost = postId => dispatch => (
  api.deletePost(postId).then(post => dispatch(removePost(post)))
);

export const deleteComment = commentId => dispatch => (
  api.deleteComment(commentId).then(comment => dispatch(removeComment(comment)))
);

export const insertPost = post => dispatch => (
  api.addPost(post).then(response => dispatch(addPost({ ...response })))
);

export const insertComment = comment => dispatch => (
  api.addComment(comment).then(response => dispatch(addComment({ ...response })))
);

export const updatePost = (id, post) => dispatch => (
  api.editPost(id, post).then(response => dispatch(editPost({ ...response })))
);

export const updateComment = (id, comment) => dispatch => (
  api.editComment(id, comment).then(response => dispatch(editComment({ ...response })))
);

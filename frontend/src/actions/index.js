import * as api from '../util/api';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SORT_BY_TYPE = 'SET_SORT_BY_TYPE';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const UPDATE_VOTE_SCORE = 'UPDATE_VOTE_SCORE';
export const REMOVE_POST = 'REMOVE_POST';

const fromResponseToObject = (response, type, valueToStore = null) => (
  Object.keys(response).reduce((accumulator, index) => {
    const auxAccumulator = Object.assign(accumulator);
    const element = response[index];
    auxAccumulator[element[type]] = valueToStore ? element[valueToStore] : element;
    return auxAccumulator;
  }, {})
);

export const addPost = (post) => ({
  type: ADD_POST,
  post,
});

export const editPost = (post) => ({
  type: EDIT_POST,
  post,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts: fromResponseToObject(posts, 'id'),
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
  type: UPDATE_VOTE_SCORE,
  post,
});

export const removePost = post => ({
  type: REMOVE_POST,
  postId: post.id,
});

export const getPosts = dispatch => (
  api.fetchPosts().then(posts => dispatch(receivePosts(posts)))
);

export const getCategories = dispatch => (
  api.fetchCategories().then(categories => dispatch(receiveCategories(categories)))
);

export const putVoteScorePost = (postId, option) => dispatch => (
  api.votePost(postId, option).then(post => dispatch(updateVoteScorePost(post)))
);

export const deletePost = postId => dispatch => (
  api.deletePost(postId).then(post => dispatch(removePost(post)))
);

export const insertPost = post => dispatch => (
  api.addPost(post).then(response => dispatch(addPost({ ...response })))
);

export const updatePost = (id, post) => dispatch => (
  api.editPost(id, post).then(response => dispatch(editPost({ ...response })))
);

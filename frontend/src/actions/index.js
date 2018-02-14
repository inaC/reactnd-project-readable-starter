import * as api from '../util/api';

export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const fromResponseToObject = (response, type, valueToStore = null) => (
  Object.keys(response).reduce((accumulator, index) => {
    const auxAccumulator = Object.assign(accumulator);
    const element = response[index];
    auxAccumulator[element[type]] = valueToStore ? element[valueToStore] : element;
    return auxAccumulator;
  }, {})
);

export const addPost = ({ id, timestamp, title, body, author, category, voteScore, deleted, commentCount }) => ({
  type: ADD_POST,
  id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  deleted,
  commentCount,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts: fromResponseToObject(posts, 'id'),
});

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories: fromResponseToObject(categories, 'name', 'path'),
});

export const getPosts = dispatch => (
  api.fetchPosts().then(posts => dispatch(receivePosts(posts)))
);

export const getCategories = dispatch => (
  api.fetchCategories().then(categories => dispatch(receiveCategories(categories)))
);

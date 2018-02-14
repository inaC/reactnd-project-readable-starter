import { RECEIVE_POSTS, RECEIVE_CATEGORIES } from '../actions';

const initialState = {
  categories: null,
  posts: null,
  comments: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    default: return state;
  }
}
export default reducer;

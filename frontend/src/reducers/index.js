import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  SET_CATEGORY,
  SET_SORT_BY_TYPE,
  TOGGLE_SIDEBAR,
  UPDATE_VOTE_SCORE,
  REMOVE_POST,
} from '../actions';

const initialState = {
  categories: null,
  posts: null,
  comments: null,
  ui: {
    defaultCategory: 'All',
    currentCategory: 'All',
    sortBy: 'voteScore',
    sideBarOpen: false,
  },
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
    case SET_CATEGORY:
      return {
        ...state,
        ui: {
          ...state.ui,
          currentCategory: action.category,
        },
      };
    case SET_SORT_BY_TYPE:
      return {
        ...state,
        ui: {
          ...state.ui,
          sortBy: action.sortBy,
        },
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          sideBarOpen: action.sideBarOpen,
        },
      };
    case UPDATE_VOTE_SCORE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post,
        },
      };
    case REMOVE_POST:
      const newState = Object.assign(state).posts;
      delete newState[action.postId];
      return {
        ...state,
        posts: newState,
      };
    default: return state;
  }
}
export default reducer;

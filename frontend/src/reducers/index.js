import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  SET_CATEGORY,
  SET_SORT_BY_TYPE,
  TOGGLE_SIDEBAR,
  UPDATE_VOTE_SCORE,
  REMOVE_POST,
  ADD_POST,
  EDIT_POST,
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
  postsByCategory: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts,
        postsByCategory: action.postsByCategory,
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
        postsByCategory: {
          ...state.postsByCategory,
          [action.post.category]: {
            ...state.postsByCategory[action.post.category],
            [action.post.id]: {
              ...state.postsByCategory[action.post.category][action.post.id],
              voteScore: action.post.voteScore,
            }
          },
        },
      };
    case REMOVE_POST:
      const newState = Object.assign({}, state).posts;
      const newCategories = Object.assign({}, state).postsByCategory;
      const { category } = newState[action.postId];
      delete newState[action.postId];
      delete newCategories[category][action.postId];
      return {
        ...state,
        posts: newState,
        postsByCategory: newCategories,
      };
    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post,
        },
        postsByCategory: {
          ...state.postsByCategory,
          [action.post.category]: {
            ...state.postsByCategory[action.post.category],
            [action.post.id]: {
              id: action.post.id,
              voteScore: action.post.voteScore,
              timestamp: action.post.timestamp,
            },
          },
        },
      };
    case EDIT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post,
        },
      };
    default: return state;
  }
}
export default reducer;

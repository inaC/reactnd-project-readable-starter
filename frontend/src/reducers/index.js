import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  SET_CATEGORY,
  SET_SORT_BY_TYPE,
  DISPLAY_POST,
  TOGGLE_SIDEBAR,
  UPDATE_VOTE_SCORE_POST,
  UPDATE_VOTE_SCORE_COMMENT,
  REMOVE_POST,
  REMOVE_COMMENT,
  ADD_POST,
  ADD_COMMENT,
  EDIT_POST,
  EDIT_COMMENT,
  RECEIVE_POST_COMMENTS,
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
    displayPost: false,
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
    case RECEIVE_POST_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.postId]: action.comments,
        },
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
          displayPost: false,
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
    case DISPLAY_POST:
      return {
        ...state,
        ui: {
          ...state.ui,
          displayPost: action.displayPost,
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
    case UPDATE_VOTE_SCORE_POST:
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
            },
          },
        },
      };
    case UPDATE_VOTE_SCORE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.parentId]: {
            ...state.comments[action.comment.parentId],
            [action.comment.id]: action.comment,
          },
        },
      };
    case REMOVE_POST:
      const posts = Object.assign({}, state.posts);
      const postsByCategory = Object.assign({}, state.postsByCategory);
      const comments = Object.assign({}, state.comments);
      const { category } = posts[action.postId];
      delete posts[action.postId];
      delete postsByCategory[category][action.postId];
      delete comments[action.postId];
      return {
        ...state,
        posts,
        postsByCategory,
        comments,
        ui: {
          ...state.ui,
          displayPost: false,
        },
      };
    case REMOVE_COMMENT:
      const newComments = Object.assign({}, state.comments);
      delete newComments[action.postId][action.commentId];
      return {
        ...state,
        comments: newComments,
        posts: {
          ...state.posts,
          [action.postId]: {
            ...state.posts[action.postId],
            commentCount: state.posts[action.postId].commentCount - 1,
          },
        },
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
    case ADD_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.parentId]: {
            ...state.comments[action.comment.parentId],
            [action.comment.id]: action.comment,
          },
        },
        posts: {
          ...state.posts,
          [action.comment.parentId]: {
            ...state.posts[action.comment.parentId],
            commentCount: state.posts[action.comment.parentId].commentCount + 1,
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
    case EDIT_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.parentId]: {
            ...state.comments[action.comment.parentId],
            [action.comment.id]: action.comment,
          },
        },
      };
    default: return state;
  }
}
export default reducer;

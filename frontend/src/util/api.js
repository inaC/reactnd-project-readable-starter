const api = 'http://localhost:3001';
const headers = { Authorization: 'whatever' };

export const fetchPosts = () => (
  fetch(`${api}/posts`, { headers }).then(res => res.json())
);

export const fetchPostComments = (post_id) => (
  fetch(`${api}/posts/${post_id}/comments`, { headers }).then(res => res.json())
);

export const fetchCategories = () => (
  fetch(`${api}/categories`, { headers }).then(res => res.json()).then(data => data.categories)
);

export const votePost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const deletePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json());

export const addPost = post =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...post })
  }).then(res => res.json());

export const editPost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...post })
  }).then(res => res.json());

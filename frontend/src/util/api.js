const api = 'http://localhost:3001';
const headers = { Authorization: 'whatever' };

export const fetchPosts = () => (
  fetch(`${api}/posts`, { headers }).then(res => res.json())
);

export const fetchCategories = () => (
  fetch(`${api}/categories`, { headers }).then(res => res.json()).then(data => data.categories)
);

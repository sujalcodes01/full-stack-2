import { createSelector } from 'reselect';

const selectPosts = (state) => state.posts;

export const selectAllPosts = createSelector(
  [selectPosts],
  (posts) => posts
);

export const selectPopularPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.likes >= 15)
);

export const selectPostsByCategory = createSelector(
  [selectPosts, (_, category) => category],
  (posts, category) => posts.filter((post) => post.category === category)
);

export const selectPostCountByCategory = createSelector(
  [selectPosts],
  (posts) => {
    const grouped = posts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, count]) => ({ category, count }));
  }
);

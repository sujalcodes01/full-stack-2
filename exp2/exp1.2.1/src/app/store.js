import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialPosts = [
  { id: 1, title: 'React Basics', category: 'Frontend', likes: 10 },
  { id: 2, title: 'Redux Toolkit', category: 'State', likes: 20 },
  { id: 3, title: 'Memoized Selectors', category: 'Performance', likes: 15 },
  { id: 4, title: 'Node APIs', category: 'Backend', likes: 5 },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    removePost: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    toggleLike: (state, action) => {
      const post = state.find((item) => item.id === action.payload);
      if (post) post.likes += 1;
    },
  },
});

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export const { addPost, removePost, toggleLike } = postsSlice.actions;
export default store;

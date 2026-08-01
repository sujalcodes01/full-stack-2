import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return [
    {
      id: 'p1',
      title: 'React basics',
      content: 'Learning React state and props.',
      platformId: 'pl1',
      likes: 1,
    },
    {
      id: 'p2',
      title: 'Redux Toolkit',
      content: 'Global state management made simple.',
      platformId: 'pl2',
      likes: 0,
    },
  ]
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: postsAdapter.addOne,
    removePost: postsAdapter.removeOne,
    toggleLike: (state, action) => {
      const post = state.entities[action.payload]
      if (post) {
        post.likes += 1
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      postsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = 'failed'
    })
  },
})

export const { addPost, removePost, toggleLike } = postsSlice.actions
export default postsSlice.reducer

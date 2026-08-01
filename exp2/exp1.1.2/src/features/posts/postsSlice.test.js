import { describe, expect, it } from 'vitest'
import postsReducer, { addPost, fetchPosts, toggleLike } from './postsSlice'

describe('posts slice', () => {
  it('adds a new post to the state', () => {
    const initialState = postsReducer(undefined, { type: '@@INIT' })
    const nextState = postsReducer(
      initialState,
      addPost({
        id: 'p3',
        title: 'New post',
        content: 'Hello from Redux',
        platformId: 'pl2',
      }),
    )

    expect(nextState.ids).toContain('p3')
    expect(nextState.entities.p3.title).toBe('New post')
  })

  it('toggles the like count for a post', async () => {
    const initialState = postsReducer(undefined, { type: '@@INIT' })
    const loadedState = postsReducer(initialState, fetchPosts.fulfilled([
      {
        id: 'p1',
        title: 'React basics',
        content: 'Learning React state and props.',
        platformId: 'pl1',
        likes: 1,
      },
    ], 'requestId'))
    const nextState = postsReducer(loadedState, toggleLike('p1'))

    expect(nextState.entities.p1.likes).toBe(2)
  })
})

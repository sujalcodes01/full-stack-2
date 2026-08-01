import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, fetchPosts, removePost, toggleLike } from './features/posts/postsSlice'
import { addPlatform } from './features/platforms/platformsSlice'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.entities)
  const postIds = useSelector((state) => state.posts.ids)
  const platforms = useSelector((state) => state.platforms.entities)
  const status = useSelector((state) => state.posts.status)

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(addPlatform({ id: 'pl3', name: 'Toolkit' }))
  }, [dispatch])

  const handleAdd = () => {
    const newId = `p${Date.now()}`
    dispatch(
      addPost({
        id: newId,
        title: 'Simple Redux demo',
        content: 'This post is added from the UI.',
        platformId: 'pl3',
        likes: 0,
      }),
    )
  }

  return (
    <div className="app">
      <img src={heroImg} alt="Redux demo illustration" width="120" />
      <h1>Redux Toolkit Demo</h1>
      <p>Status: {status}</p>

      <h2>Platforms</h2>
      <ul>
        {Object.values(platforms).map((platform) => (
          <li key={platform.id}>{platform.name}</li>
        ))}
      </ul>

      <h2>Posts</h2>
      <button onClick={handleAdd}>
        Add post
      </button>

      <ul>
        {postIds.map((id) => {
          const post = posts[id]
          return (
            <li key={id}>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
              <button onClick={() => dispatch(toggleLike(post.id))}>Like {post.likes}</button>
              <button onClick={() => dispatch(removePost(post.id))}>Remove</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App

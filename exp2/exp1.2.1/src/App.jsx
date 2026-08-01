import { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, removePost } from './app/store';
import {
  selectAllPosts,
  selectPopularPosts,
  selectPostsByCategory,
  selectPostCountByCategory,
} from './app/selectors';

const MemoizedList = memo(function MemoizedList({ posts, title, onRemove }) {
  console.log(`Rendering ${title}`);
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.category} ({post.likes} likes)
            <button onClick={() => onRemove(post.id)} style={{ marginLeft: '8px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

const OptimizedMemoizedList = memo(function OptimizedMemoizedList({ posts, title, onRemove }) {
  console.log(`Rendering ${title} (memo)`);
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.category} ({post.likes} likes)
            <button onClick={() => onRemove(post.id)} style={{ marginLeft: '8px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

function App() {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const popularPosts = useSelector(selectPopularPosts);
  const [category, setCategory] = useState('Frontend');
  const filteredPosts = useSelector((state) => selectPostsByCategory(state, category));
  const groupedPosts = useSelector(selectPostCountByCategory);

  const selectedCategoryPosts = useMemo(() => {
    return allPosts.filter((post) => post.category === category);
  }, [allPosts, category]);

  const handleAdd = () => {
    const newPost = {
      id: Date.now(),
      title: 'New Post',
      category: category,
      likes: 0,
    };
    dispatch(addPost(newPost));
  };

  const handleRemove = (id) => {
    dispatch(removePost(id));
  };

  return (
    <div>
      <h1>Memoized Selectors Demo</h1>
      <p>This example shows derived state, memoized selectors, and lighter re-rendering.</p>

      <div>
        <h2>Controls</h2>
        <div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Frontend">Frontend</option>
            <option value="State">State</option>
            <option value="Performance">Performance</option>
            <option value="Backend">Backend</option>
          </select>
          <button onClick={handleAdd}>Add Post</button>
        </div>

        <div>
          <span>Total Posts: {allPosts.length}</span> |
          <span>Popular Posts: {popularPosts.length}</span> |
          <span>Selected Category: {category}</span>
        </div>
      </div>

      <MemoizedList title="All Posts" posts={allPosts} onRemove={handleRemove} />
      <MemoizedList title="Popular Posts" posts={popularPosts} onRemove={handleRemove} />
      <OptimizedMemoizedList title="Selected Category" posts={selectedCategoryPosts} onRemove={handleRemove} />
      <MemoizedList title="Filtered Posts" posts={filteredPosts} onRemove={handleRemove} />

      <div>
        <h2>Grouped by Category</h2>
        <ul>
          {groupedPosts.map((item) => (
            <li key={item.category}>
              {item.category}: {item.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

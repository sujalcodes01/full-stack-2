import { useMemo, useState } from 'react'

const initialPosts = [
  { id: 1, title: 'Product launch teaser', time: '09:30', channel: 'Instagram', color: 'pink', status: 'Scheduled' },
  { id: 2, title: 'Behind the scenes reel', time: '14:00', channel: 'Instagram', color: 'purple', status: 'Draft' },
  { id: 3, title: 'Weekly newsletter', time: '10:00', channel: 'Email', color: 'orange', status: 'Scheduled' },
  { id: 4, title: 'Community spotlight', time: '16:30', channel: 'LinkedIn', color: 'blue', status: 'Scheduled' },
  { id: 5, title: 'Friday feature', time: '11:00', channel: 'Twitter', color: 'green', status: 'Draft' },
].map((post, index) => ({ ...post, date: `2026-08-${String([3, 6, 12, 18, 21][index]).padStart(2, '0')}` }))

const channels = ['All channels', 'Instagram', 'LinkedIn', 'Twitter', 'Email']
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const toKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export default function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [channel, setChannel] = useState('All channels')
  const [month, setMonth] = useState(new Date(2026, 7, 1))
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')
  const calendarDays = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const offset = (first.getDay() + 6) % 7
    const start = new Date(first); start.setDate(1 - offset)
    return Array.from({ length: 42 }, (_, i) => { const day = new Date(start); day.setDate(start.getDate() + i); return day })
  }, [month])
  const visiblePosts = posts.filter(p => channel === 'All channels' || p.channel === channel)
  const changeMonth = amount => setMonth(new Date(month.getFullYear(), month.getMonth() + amount, 1))
  const savePost = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const edited = { id: modal?.post?.id ?? Date.now(), title: data.get('title'), date: data.get('date'), time: data.get('time'), channel: data.get('channel'), status: data.get('status'), color: data.get('color') }
    setPosts(current => modal?.post ? current.map(p => p.id === edited.id ? edited : p) : [...current, edited])
    setNotice(modal?.post ? 'Post updated successfully.' : 'New post scheduled successfully.')
    setModal(null); setTimeout(() => setNotice(''), 2600)
  }
  const dropPost = (event, date) => {
    event.preventDefault()
    const id = Number(event.dataTransfer.getData('postId'))
    setPosts(current => current.map(post => post.id === id ? { ...post, date: toKey(date) } : post))
    setNotice('Post rescheduled successfully.'); setTimeout(() => setNotice(''), 2600)
  }
  return <main>
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">✦</span> postly</div>
      <nav><a>⌂ <span>Overview</span></a><a className="active">▣ <span>Calendar</span></a><a>▤ <span>Posts</span></a><a>◫ <span>Media library</span></a></nav>
      <div className="workspace"><p>WORKSPACE</p><div className="avatar">A</div><div><b>Acme Studio</b><small>Creative workspace</small></div><span>⌄</span></div>
    </aside>
    <section className="content">
      <header><div><p className="eyebrow">CONTENT PLANNER</p><h1>Calendar</h1><p className="subtitle">Plan, schedule and manage your content.</p></div><button className="primary" onClick={() => setModal({ date: toKey(new Date(2026, 7, 24)) })}>＋ Create post</button></header>
      <div className="toolbar"><div className="month-controls"><button onClick={() => changeMonth(-1)}>‹</button><button onClick={() => setMonth(new Date(2026, 7, 1))}>Today</button><button onClick={() => changeMonth(1)}>›</button><strong>{month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</strong></div><div className="filters"><select value={channel} onChange={e => setChannel(e.target.value)}>{channels.map(c => <option key={c}>{c}</option>)}</select><button className="view active-view">Month</button><button className="view">Week</button></div></div>
      <div className="calendar"><div className="weekdays">{weekdays.map(day => <span key={day}>{day}</span>)}</div><div className="grid">{calendarDays.map(day => { const key = toKey(day), sameMonth = day.getMonth() === month.getMonth(), dayPosts = visiblePosts.filter(p => p.date === key); return <div key={key} className={`day ${sameMonth ? '' : 'muted'}`} onDragOver={e => e.preventDefault()} onDrop={e => dropPost(e, day)} onClick={() => dayPosts.length === 0 && setModal({ date: key })}><span className="date">{day.getDate()}</span>{dayPosts.map(post => <button draggable onDragStart={e => e.dataTransfer.setData('postId', post.id)} onClick={e => { e.stopPropagation(); setModal({ post }) }} className={`post ${post.color}`} key={post.id}><span>{post.time}</span>{post.title}<i>{post.channel === 'Instagram' ? '◎' : post.channel === 'LinkedIn' ? 'in' : post.channel === 'Email' ? '✉' : '𝕏'}</i></button>)}</div> })}</div></div>
      <div className="legend"><span><i className="dot pink"></i>Instagram</span><span><i className="dot blue"></i>LinkedIn</span><span><i className="dot green"></i>Twitter</span><span><i className="dot orange"></i>Email</span><em>Tip: Drag a post to another day to reschedule it.</em></div>
    </section>
    {notice && <div className="toast">✓ {notice}</div>}
    {modal && <div className="overlay" onMouseDown={() => setModal(null)}><form className="modal" onSubmit={savePost} onMouseDown={e => e.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">{modal.post ? 'EDIT POST' : 'NEW POST'}</p><h2>{modal.post ? 'Update scheduled post' : 'Schedule a post'}</h2></div><button type="button" onClick={() => setModal(null)}>×</button></div><label>Post title<input required name="title" defaultValue={modal.post?.title} placeholder="What are you publishing?" /></label><div className="form-row"><label>Date<input required name="date" type="date" defaultValue={modal.post?.date || modal.date} /></label><label>Time<input required name="time" type="time" defaultValue={modal.post?.time || '09:00'} /></label></div><div className="form-row"><label>Channel<select name="channel" defaultValue={modal.post?.channel || 'Instagram'}>{channels.slice(1).map(c => <option key={c}>{c}</option>)}</select></label><label>Status<select name="status" defaultValue={modal.post?.status || 'Scheduled'}><option>Scheduled</option><option>Draft</option></select></label></div><label>Colour<select name="color" defaultValue={modal.post?.color || 'purple'}><option value="pink">Pink</option><option value="purple">Purple</option><option value="blue">Blue</option><option value="green">Green</option><option value="orange">Orange</option></select></label><div className="modal-actions"><button type="button" onClick={() => setModal(null)}>Cancel</button><button className="primary">{modal.post ? 'Save changes' : 'Schedule post'}</button></div></form></div>}
  </main>
}

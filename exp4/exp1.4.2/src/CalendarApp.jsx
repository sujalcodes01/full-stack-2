import { memo, useCallback, useMemo, useState } from 'react';
import { MONTHS, WEEKDAYS, dateKey, getMonthGrid } from './calendar';

const INITIAL_EVENTS = {
  '2026-08-06': [{ id: 1, title: 'Product review', tone: 'blue' }],
  '2026-08-12': [{ id: 2, title: 'Design sync', tone: 'mint' }],
  '2026-08-18': [{ id: 3, title: 'Performance audit', tone: 'rose' }],
  '2026-08-26': [{ id: 4, title: 'Release candidate', tone: 'amber' }],
};

const EventPill = memo(function EventPill({ event }) {
  return <span className={`event event--${event.tone}`}>{event.title}</span>;
});

const CalendarDay = memo(function CalendarDay({ cell, month, year, events, selected, onSelect }) {
  const key = cell.currentMonth ? dateKey(year, month, cell.day) : '';
  const cellEvents = key ? events[key] ?? [] : [];
  const isSelected = key === selected;

  return (
    <button
      className={`day ${cell.currentMonth ? '' : 'day--muted'} ${isSelected ? 'day--selected' : ''}`}
      onClick={() => cell.currentMonth && onSelect(key)}
      disabled={!cell.currentMonth}
      aria-label={cell.currentMonth ? `Select ${MONTHS[month]} ${cell.day}` : 'Outside current month'}
      aria-pressed={isSelected}
    >
      <span className="day__number">{cell.day}</span>
      <span className="day__events">
        {cellEvents.slice(0, 2).map((event) => <EventPill key={event.id} event={event} />)}
        {cellEvents.length > 2 && <span className="more-events">+{cellEvents.length - 2} more</span>}
      </span>
    </button>
  );
});

export function CalendarApp() {
  const [viewDate, setViewDate] = useState({ year: 2026, month: 7 });
  const [selected, setSelected] = useState('2026-08-18');
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const grid = useMemo(
    () => getMonthGrid(viewDate.year, viewDate.month),
    [viewDate.year, viewDate.month],
  );

  const goToMonth = useCallback((direction) => {
    setViewDate(({ year, month }) => {
      const next = new Date(year, month + direction, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }, []);

  const selectDate = useCallback((key) => setSelected(key), []);

  const addFocusBlock = useCallback(() => {
    if (!selected) return;
    setEvents((current) => ({
      ...current,
      [selected]: [...(current[selected] ?? []), { id: Date.now(), title: 'Focus block', tone: 'blue' }],
    }));
  }, [selected]);

  const selectedEvents = events[selected] ?? [];
  const selectedLabel = selected
    ? new Date(`${selected}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'No date selected';

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand__mark">C</span><span>Calm</span></div>
        <div className="topbar__actions"><button className="icon-button" aria-label="Search">⌕</button><div className="avatar">SK</div></div>
      </header>
      <section className="workspace" aria-label="Calendar workspace">
        <aside className="sidebar">
          <p className="eyebrow">Workspace</p>
          <h1>Planning board</h1>
          <button className="new-event" onClick={addFocusBlock}>+ New event</button>
          <nav aria-label="Calendar navigation"><a className="nav-link nav-link--active" href="#calendar">Calendar</a><a className="nav-link" href="#schedule">Schedule</a><a className="nav-link" href="#insights">Insights</a></nav>
          <div className="sidebar__footer"><span className="status-dot" />All changes saved</div>
        </aside>
        <section className="calendar-panel" id="calendar">
          <div className="calendar-toolbar">
            <div><p className="eyebrow">Monthly overview</p><h2>{MONTHS[viewDate.month]} {viewDate.year}</h2></div>
            <div className="month-controls"><button className="icon-button" aria-label="Previous month" onClick={() => goToMonth(-1)}>‹</button><button className="today-button" onClick={() => setViewDate({ year: 2026, month: 7 })}>Today</button><button className="icon-button" aria-label="Next month" onClick={() => goToMonth(1)}>›</button></div>
          </div>
          <div className="weekdays">{WEEKDAYS.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="calendar-grid">
            {grid.map((cell, index) => <CalendarDay key={`${cell.offset}-${cell.day}-${index}`} cell={cell} month={viewDate.month} year={viewDate.year} events={events} selected={selected} onSelect={selectDate} />)}
          </div>
        </section>
        <aside className="agenda" aria-live="polite">
          <p className="eyebrow">Selected day</p><h2>{selectedLabel}</h2>
          <div className="agenda__line" />
          {selectedEvents.length ? selectedEvents.map((event) => <div className="agenda-event" key={event.id}><span className={`event-dot event-dot--${event.tone}`} /><div><strong>{event.title}</strong><small>9:30 AM - 10:15 AM</small></div></div>) : <p className="empty-state">Nothing scheduled yet. Give this day a little room to breathe.</p>}
          <button className="add-link" onClick={addFocusBlock}>+ Add focus block</button>
          <section className="performance-note"><p className="eyebrow">Rendering status</p><strong>42 day cells</strong><span>Memoized grid and stable event callbacks</span></section>
        </aside>
      </section>
    </main>
  );
}

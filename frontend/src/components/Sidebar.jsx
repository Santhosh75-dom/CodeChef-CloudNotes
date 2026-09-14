import React from 'react';
import { 
  FileText, 
  Home, 
  Search, 
  Star, 
  Trash2, 
  Plus, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function Sidebar({
  currentView,
  setCurrentView,
  notes = [],
  activeNoteId,
  setActiveNoteId,
  onNewNote,
  onOpenSearch,
  mobileOpen,
  setMobileOpen
}) {
  const activeNotes = notes.filter(n => !n.is_deleted);
  const favoriteNotes = notes.filter(n => n.is_favorite && !n.is_deleted);
  const trashNotes = notes.filter(n => n.is_deleted);

  const handleNavClick = (view) => {
    setCurrentView(view);
    if (setMobileOpen) setMobileOpen(false);
  };

  const handleSelectNote = (noteId) => {
    setActiveNoteId(noteId);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={18} />
          </div>
          <span>CloudNotes</span>
        </div>
      </div>

      {/* New Page Button */}
      <button 
        className="new-page-btn"
        onClick={() => {
          onNewNote();
          if (setMobileOpen) setMobileOpen(false);
        }}
      >
        <Plus size={18} />
        <span>New Page</span>
      </button>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <button 
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <Home size={18} />
            <span>Home</span>
            <span className="badge">{activeNotes.length}</span>
          </button>

          <button 
            className="nav-item"
            onClick={onOpenSearch}
          >
            <Search size={18} />
            <span>Search</span>
            <span className="badge">⌘K</span>
          </button>

          <button 
            className={`nav-item ${currentView === 'favorites' ? 'active' : ''}`}
            onClick={() => handleNavClick('favorites')}
          >
            <Star size={18} />
            <span>Favorites</span>
            <span className="badge">{favoriteNotes.length}</span>
          </button>

          <button 
            className={`nav-item ${currentView === 'trash' ? 'active' : ''}`}
            onClick={() => handleNavClick('trash')}
          >
            <Trash2 size={18} />
            <span>Trash</span>
            <span className="badge">{trashNotes.length}</span>
          </button>
        </div>

        {/* My Pages List */}
        <div className="nav-section">
          <div className="nav-section-title">My Pages</div>
          {activeNotes.length === 0 ? (
            <div style={{ padding: '8px 12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              No pages yet
            </div>
          ) : (
            activeNotes.slice(0, 8).map(note => (
              <button
                key={note.id}
                className={`notes-list-item ${activeNoteId === note.id ? 'active' : ''}`}
                onClick={() => handleSelectNote(note.id)}
              >
                <span>{note.icon || '📄'}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {note.title || 'Untitled'}
                </span>
              </button>
            ))
          )}
        </div>
      </nav>
    </aside>
  );
}

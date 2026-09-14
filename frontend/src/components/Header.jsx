import React from 'react';
import { Menu, Search, Plus, Star, ArrowLeft } from 'lucide-react';

export default function Header({
  currentView,
  onOpenSearch,
  onNewNote,
  mobileOpen,
  setMobileOpen,
  activeNote
}) {
  const getBreadcrumbTitle = () => {
    if (activeNote) return activeNote.title || 'Untitled';
    switch (currentView) {
      case 'favorites': return 'Favorites';
      case 'trash': return 'Trash';
      case 'home': default: return 'Dashboard';
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="header-title">
          {activeNote && <span>{activeNote.icon || '📄'}</span>}
          <span>{getBreadcrumbTitle()}</span>
        </div>
      </div>

      <div className="header-right">
        <button className="search-trigger-btn" onClick={onOpenSearch}>
          <Search size={16} />
          <span>Quick search...</span>
          <kbd className="shortcut-kbd">⌘K</kbd>
        </button>

        <button 
          className="action-btn"
          style={{ background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 'var(--radius-md)' }}
          onClick={onNewNote}
        >
          <Plus size={16} />
          <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>New</span>
        </button>
      </div>
    </header>
  );
}

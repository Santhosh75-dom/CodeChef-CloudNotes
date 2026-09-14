import React, { useState, useEffect } from 'react';
import { Search, X, FileText } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  notes,
  onSelectNote
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredNotes = notes.filter(n => 
    !n.is_deleted && (
      (n.title && n.title.toLowerCase().includes(query.toLowerCase())) ||
      (n.content && n.content.toLowerCase().includes(query.toLowerCase()))
    )
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-header">
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="search-input"
            placeholder="Search all notes by title or content..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button className="action-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="search-results-list">
          {filteredNotes.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No notes matching "{query}"
            </div>
          ) : (
            filteredNotes.map(note => (
              <div 
                key={note.id}
                className="search-result-item"
                onClick={() => {
                  onSelectNote(note.id);
                  onClose();
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{note.icon || '📄'}</span>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    {note.title || 'Untitled'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {note.content || 'Empty note'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

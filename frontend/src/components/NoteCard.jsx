import React from 'react';
import { Star, Trash2, RotateCcw, Clock } from 'lucide-react';

export default function NoteCard({
  note,
  onSelect,
  onToggleFavorite,
  onDelete,
  onRestore,
  isTrashView = false
}) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Just now';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="note-card" onClick={() => onSelect(note.id)}>
      <div className="card-top">
        <span className="card-icon">{note.icon || '📄'}</span>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          {!isTrashView ? (
            <>
              <button 
                className={`action-btn fav-btn ${note.is_favorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(note.id)}
                title={note.is_favorite ? "Unfavorite" : "Favorite"}
              >
                <Star size={16} fill={note.is_favorite ? "currentColor" : "none"} />
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => onDelete(note.id)}
                title="Move to trash"
              >
                <Trash2 size={16} />
              </button>
            </>
          ) : (
            <>
              <button 
                className="action-btn"
                onClick={() => onRestore(note.id)}
                title="Restore note"
              >
                <RotateCcw size={16} />
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => onDelete(note.id, true)}
                title="Delete permanently"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card-title">{note.title || 'Untitled Note'}</div>
      
      <div className="card-content-preview">
        {note.content ? note.content : <span style={{ fontStyle: 'italic', opacity: 0.5 }}>Empty note...</span>}
      </div>

      <div className="card-footer">
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={12} />
          {formatDate(note.updated_at || note.created_at)}
        </span>
      </div>
    </div>
  );
}

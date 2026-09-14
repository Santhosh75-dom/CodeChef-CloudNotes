import React from 'react';
import { 
  ArrowLeft, 
  Star, 
  Trash2, 
  RotateCcw, 
  Clock, 
  Sparkles,
  Save
} from 'lucide-react';

const EMOJI_OPTIONS = ['📄', '📚', '💡', '☁️', '🎯', '📝', '⚡', '🚀', '⭐', '🔥', '📌', '🛠️'];

export default function Editor({
  note,
  onUpdate,
  onBack,
  onToggleFavorite,
  onDeleteNote,
  onRestoreNote
}) {
  if (!note) return null;

  const handleTitleChange = (e) => {
    onUpdate(note.id, { title: e.target.value });
  };

  const handleContentChange = (e) => {
    onUpdate(note.id, { content: e.target.value });
  };

  const handleIconChange = (icon) => {
    onUpdate(note.id, { icon });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Just now';
    try {
      return new Date(dateStr).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="editor-container">
      {/* Editor Navigation Bar */}
      <div className="editor-topbar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back to Pages</span>
        </button>

        <div className="editor-top-actions">
          {!note.is_deleted ? (
            <>
              <button 
                className={`action-btn fav-btn ${note.is_favorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(note.id)}
                title={note.is_favorite ? "Unfavorite" : "Favorite"}
              >
                <Star size={18} fill={note.is_favorite ? "currentColor" : "none"} />
              </button>

              <button 
                className="action-btn delete-btn"
                onClick={() => {
                  onDeleteNote(note.id);
                  onBack();
                }}
                title="Move to trash"
              >
                <Trash2 size={18} />
              </button>
            </>
          ) : (
            <>
              <button 
                className="action-btn"
                onClick={() => onRestoreNote(note.id)}
                title="Restore Note"
              >
                <RotateCcw size={18} />
                <span style={{ fontSize: '0.85rem', marginLeft: 4 }}>Restore</span>
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => {
                  onDeleteNote(note.id, true);
                  onBack();
                }}
                title="Delete Permanently"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Editor Main Content Area */}
      <div className="editor-body">
        {/* Page Icon Palette */}
        <div className="icon-picker-row">
          <span className="current-editor-icon">{note.icon || '📄'}</span>
          <div className="emoji-palette">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                className={`emoji-btn ${note.icon === emoji ? 'selected' : ''}`}
                onClick={() => handleIconChange(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Title Input */}
        <input
          type="text"
          className="editor-title-input"
          placeholder="Untitled Note"
          value={note.title || ''}
          onChange={handleTitleChange}
        />

        {/* Meta Info Bar */}
        <div className="editor-meta">
          <span className="meta-item">
            <Clock size={14} />
            <span>Last edited {formatDate(note.updated_at || note.created_at)}</span>
          </span>
          <span className="saved-badge">
            <Save size={12} /> Saved
          </span>
        </div>

        <hr className="editor-divider" />

        {/* Note Content Textarea */}
        <textarea
          className="editor-content-textarea"
          placeholder="Start typing your note here... (Markdown supported)"
          value={note.content || ''}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
}

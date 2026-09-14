import React from 'react';
import NoteCard from './NoteCard';
import { FileText, Star, Trash2, Plus, Inbox } from 'lucide-react';

export default function Dashboard({
  currentView,
  notes,
  onSelectNote,
  onToggleFavorite,
  onDeleteNote,
  onRestoreNote,
  onNewNote
}) {
  const activeNotes = notes.filter(n => !n.is_deleted);
  const favoriteNotes = notes.filter(n => n.is_favorite && !n.is_deleted);
  const trashNotes = notes.filter(n => n.is_deleted);

  let displayedNotes = activeNotes;
  let title = "All Notes";
  let subtitle = "Manage and organize your personal cloud workspace";

  if (currentView === 'favorites') {
    displayedNotes = favoriteNotes;
    title = "Favorites";
    subtitle = "Quick access to your starred pages";
  } else if (currentView === 'trash') {
    displayedNotes = trashNotes;
    title = "Trash";
    subtitle = "Deleted notes can be restored or permanently removed";
  }

  return (
    <div className="dashboard-container">
      {/* Dashboard Top Banner */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">{title}</h1>
        <p className="dashboard-subtitle">{subtitle}</p>
      </div>

      {/* Quick Stats Grid */}
      {currentView === 'home' && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FileText size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{activeNotes.length}</span>
              <span className="stat-label">Total Notes</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper fav">
              <Star size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{favoriteNotes.length}</span>
              <span className="stat-label">Favorites</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper trash">
              <Trash2 size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{trashNotes.length}</span>
              <span className="stat-label">Trash Items</span>
            </div>
          </div>
        </div>
      )}

      {/* Cards Section */}
      <div className="section-header">
        <h2 className="section-title">
          {currentView === 'home' ? 'Recent Workspace Pages' : title}
        </h2>
      </div>

      {displayedNotes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <Inbox size={28} />
          </div>
          <div className="empty-title">
            {currentView === 'trash' ? 'Trash is empty' : currentView === 'favorites' ? 'No favorites yet' : 'No notes in your workspace'}
          </div>
          <p className="empty-desc">
            {currentView === 'trash' 
              ? 'Items deleted from your workspace will appear here.'
              : currentView === 'favorites'
              ? 'Star important pages to find them quickly here.'
              : 'Create your first page to start taking notes and organizing ideas.'}
          </p>
          {currentView === 'home' && (
            <button className="new-page-btn" onClick={onNewNote}>
              <Plus size={18} />
              <span>Create New Page</span>
            </button>
          )}
        </div>
      ) : (
        <div className="cards-grid">
          {displayedNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onSelect={onSelectNote}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDeleteNote}
              onRestore={onRestoreNote}
              isTrashView={currentView === 'trash'}
            />
          ))}
        </div>
      )}
    </div>
  );
}

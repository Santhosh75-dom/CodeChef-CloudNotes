import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import SearchModal from './components/SearchModal';
import * as api from './api/notesApi';
import './App.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'favorites' | 'trash'
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notes from backend
  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let data = [];
      if (currentView === 'trash') {
        data = await api.fetchTrashNotes();
      } else if (currentView === 'favorites') {
        data = await api.fetchNotes({ only_favorites: true });
      } else {
        data = await api.fetchNotes({ include_deleted: false });
      }
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError(err.message || 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  }, [currentView]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Create new note via API
  const handleNewNote = async () => {
    try {
      setLoading(true);
      const newNote = await api.createNote({
        title: 'Untitled Note',
        icon: '📄',
        content: ''
      });
      setNotes(prev => [newNote, ...prev]);
      setActiveNoteId(newNote.id);
    } catch (err) {
      console.error('Error creating note:', err);
      setError('Could not create note. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Update note via API
  const handleUpdateNote = async (id, updatedFields) => {
    // Optimistic UI update
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updatedFields } : n));

    try {
      const updated = await api.updateNote(id, updatedFields);
      setNotes(prev => prev.map(n => n.id === id ? updated : n));
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  // Toggle Favorite via API
  const handleToggleFavorite = async (id) => {
    const target = notes.find(n => n.id === id);
    if (!target) return;

    // Optimistic UI update
    setNotes(prev => prev.map(n => n.id === id ? { ...n, is_favorite: !n.is_favorite } : n));

    try {
      const updated = await api.toggleFavoriteNote(id);
      setNotes(prev => prev.map(n => n.id === id ? updated : n));
    } catch (err) {
      console.error('Error toggling favorite:', err);
      loadNotes(); // Revert on failure
    }
  };

  // Delete note via API
  const handleDeleteNote = async (id, permanent = false) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    try {
      await api.deleteNote(id, permanent);
    } catch (err) {
      console.error('Error deleting note:', err);
      loadNotes();
    }
  };

  // Restore note via API
  const handleRestoreNote = async (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    try {
      await api.restoreNote(id);
    } catch (err) {
      console.error('Error restoring note:', err);
      loadNotes();
    }
  };

  const activeNote = notes.find(n => n.id === activeNoteId);

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          setActiveNoteId(null);
        }}
        notes={notes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
        onNewNote={handleNewNote}
        onOpenSearch={() => setSearchOpen(true)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Workspace Area */}
      <div className="main-wrapper">
        <Header
          currentView={currentView}
          onOpenSearch={() => setSearchOpen(true)}
          onNewNote={handleNewNote}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          activeNote={activeNote}
        />

        <main className="content-body">
          {error && (
            <div style={{
              padding: '12px 18px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid var(--danger-color)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              color: '#fca5a5',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>⚠️ {error}</span>
              <button 
                onClick={loadNotes} 
                style={{ background: 'var(--danger-color)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}
              >
                Retry
              </button>
            </div>
          )}

          {activeNote ? (
            <Editor
              note={activeNote}
              onUpdate={handleUpdateNote}
              onBack={() => setActiveNoteId(null)}
              onToggleFavorite={handleToggleFavorite}
              onDeleteNote={handleDeleteNote}
              onRestoreNote={handleRestoreNote}
            />
          ) : (
            <Dashboard
              currentView={currentView}
              notes={notes}
              onSelectNote={(id) => setActiveNoteId(id)}
              onToggleFavorite={handleToggleFavorite}
              onDeleteNote={handleDeleteNote}
              onRestoreNote={handleRestoreNote}
              onNewNote={handleNewNote}
            />
          )}
        </main>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        notes={notes}
        onSelectNote={(id) => setActiveNoteId(id)}
      />
    </div>
  );
}

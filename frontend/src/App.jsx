import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SearchModal from './components/SearchModal';
import './App.css';

// Initial sample data for Phase 3 UI preview
const INITIAL_NOTES = [
  {
    id: 1,
    title: 'DBMS Notes & Normalization',
    icon: '📚',
    content: 'Database Management Systems notes. Normalization techniques: 1NF, 2NF, 3NF, BCNF. Key concepts: ACID properties, transactions, indexing.',
    is_favorite: true,
    is_deleted: false,
    updated_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 2,
    title: 'AWS EC2 Deployment Guide',
    icon: '☁️',
    content: 'Steps to deploy FastAPI & React on Ubuntu EC2: 1. Launch instance, 2. Configure SSH, 3. Setup Nginx reverse proxy, 4. Open Port 80.',
    is_favorite: true,
    is_deleted: false,
    updated_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 3,
    title: 'Project Roadmap & Ideas',
    icon: '💡',
    content: 'Features to build: Markdown editor preview, tags & categories, export to PDF, dark/light theme switcher.',
    is_favorite: false,
    is_deleted: false,
    updated_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export default function App() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'favorites' | 'trash'
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handlers for Phase 3 UI interactions
  const handleNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      icon: '📄',
      content: '',
      is_favorite: false,
      is_deleted: false,
      updated_at: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleToggleFavorite = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, is_favorite: !n.is_favorite } : n));
  };

  const handleDeleteNote = (id, permanent = false) => {
    if (permanent) {
      setNotes(notes.filter(n => n.id !== id));
    } else {
      setNotes(notes.map(n => n.id === id ? { ...n, is_deleted: true } : n));
    }
  };

  const handleRestoreNote = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, is_deleted: false } : n));
  };

  const activeNote = notes.find(n => n.id === activeNoteId);

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        notes={notes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
        onNewNote={handleNewNote}
        onOpenSearch={() => setSearchOpen(true)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
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
          <Dashboard
            currentView={currentView}
            notes={notes}
            onSelectNote={(id) => setActiveNoteId(id)}
            onToggleFavorite={handleToggleFavorite}
            onDeleteNote={handleDeleteNote}
            onRestoreNote={handleRestoreNote}
            onNewNote={handleNewNote}
          />
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

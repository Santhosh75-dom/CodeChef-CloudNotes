const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/notes';

export const fetchNotes = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_BASE_URL}?${query}` : API_BASE_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch notes: ${res.statusText}`);
  return await res.json();
};

export const fetchNoteById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch note ${id}: ${res.statusText}`);
  return await res.json();
};

export const fetchTrashNotes = async () => {
  const res = await fetch(`${API_BASE_URL}/trash`);
  if (!res.ok) throw new Error(`Failed to fetch trash notes: ${res.statusText}`);
  return await res.json();
};

export const createNote = async (noteData = {}) => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData),
  });
  if (!res.ok) throw new Error(`Failed to create note: ${res.statusText}`);
  return await res.json();
};

export const updateNote = async (id, updateData) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  });
  if (!res.ok) throw new Error(`Failed to update note ${id}: ${res.statusText}`);
  return await res.json();
};

export const toggleFavoriteNote = async (id, isFavorite = null) => {
  const res = await fetch(`${API_BASE_URL}/${id}/favorite`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(isFavorite !== null ? { is_favorite: isFavorite } : {}),
  });
  if (!res.ok) throw new Error(`Failed to toggle favorite on note ${id}: ${res.statusText}`);
  return await res.json();
};

export const deleteNote = async (id, permanent = false) => {
  const url = permanent ? `${API_BASE_URL}/${id}?permanent=true` : `${API_BASE_URL}/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete note ${id}: ${res.statusText}`);
  return await res.json();
};

export const restoreNote = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}/restore`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to restore note ${id}: ${res.statusText}`);
  return await res.json();
};

export const searchNotes = async (q) => {
  const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`Search failed: ${res.statusText}`);
  return await res.json();
};

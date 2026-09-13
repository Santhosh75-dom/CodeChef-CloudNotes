# CloudNotes

A lightweight, modern, Notion-inspired note-taking and workspace application built with React, FastAPI, SQLAlchemy, and SQLite.

## Features

- **Block & Document Note Editor**: Modern editing experience with titles, icons, and rich text/markdown notes.
- **Organization & Pages**: Categorize notes, manage favorites, and move items to trash.
- **Instant Search**: Search through note titles and content in real-time.
- **Persistent Storage**: Backend API powered by FastAPI & SQLite.
- **Responsive UI**: Sleek sidebar navigation and collapsible view for desktop, tablet, and mobile.

## Technology Stack

- **Frontend**: React, Vite, Vanilla CSS / Tailwind, Lucide Icons
- **Backend**: Python 3.13, FastAPI, SQLAlchemy, SQLite, Pydantic
- **Deployment**: AWS EC2 (Ubuntu), Nginx

## Repository Structure

```
CloudNotes/
├── frontend/             # React + Vite application
├── backend/              # FastAPI application
├── CloudNotes_PRD.md     # Product Requirements Document
├── CloudNotes_Implementation_Plan.md # Implementation plan & tracker
└── README.md
```

## Setup Instructions

### Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Unix:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

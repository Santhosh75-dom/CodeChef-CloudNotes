# CloudNotes — Product Requirements Document

## 1. Product Overview

CloudNotes is a modern, Notion-inspired note-taking and workspace application that allows users to create, organize, edit, and delete notes inside a clean block-based interface.

The application is designed as a lightweight alternative to Notion for personal note-taking rather than attempting to reproduce every feature of Notion.

The primary goal is to demonstrate a complete full-stack web application with:

* Modern frontend
* RESTful backend APIs
* Persistent database storage
* CRUD operations
* Responsive UI
* AWS EC2 deployment
* Public internet accessibility

The application must be simple enough to deploy reliably on a single Ubuntu EC2 instance.

---

# 2. Goals

### Primary Goals

1. Create a polished Notion-inspired note-taking experience.
2. Allow users to create, view, edit, and delete notes.
3. Organize notes inside workspaces/pages.
4. Provide persistent storage using a relational database.
5. Expose CRUD functionality through a REST API.
6. Deploy the complete application to an Ubuntu AWS EC2 instance.
7. Make the application publicly accessible through the EC2 public IP.
8. Demonstrate understanding of SSH and AWS Security Groups.

### Secondary Goals

* Provide a professional UI rather than a basic CRUD demo.
* Make the application responsive.
* Provide search functionality.
* Support basic page organization.
* Provide a clean dashboard/sidebar experience inspired by Notion.

---

# 3. Non-Goals

The first version should NOT attempt to implement the complete Notion feature set.

The following are explicitly out of scope for Version 1:

* Real-time collaboration
* Multi-user editing
* Authentication and OAuth
* Team workspaces
* Comments
* File sharing
* Advanced permissions
* Complex databases
* Calendar
* AI assistant
* Real-time synchronization
* Offline-first architecture
* Drag-and-drop block reordering
* Complex rich-text formatting
* Notifications

These may be considered future improvements.

---

# 4. Target User

The primary user is a student or individual who wants a simple workspace for organizing notes, study material, ideas, and personal documentation.

Example use cases:

* Lecture notes
* Project documentation
* To-do notes
* Study material
* Personal ideas
* Meeting notes
* Coding notes

---

# 5. Core User Flow

The primary experience should follow:

```
Open CloudNotes
      ↓
Dashboard
      ↓
Select / Create Page
      ↓
Open Note Editor
      ↓
Write / Edit Content
      ↓
Save
      ↓
Content persists in database
```

Users should be able to:

```
Create → Read → Update → Delete
```

notes.

---

# 6. Application Structure

The application should contain the following major screens:

## 6.1 Dashboard

The dashboard is the landing page.

It should display:

* Application name/logo
* Sidebar
* Search
* Recent pages
* Favorite pages
* Create page button
* User-independent workspace information

Example layout:

```
┌──────────────────────────────────────────────────────┐
│ CloudNotes                                           │
├───────────────┬──────────────────────────────────────┤
│               │                                      │
│ Workspace     │  Welcome back                       │
│               │                                      │
│ + New Page    │  Recent Pages                        │
│               │                                      │
│ 🔍 Search     │  ┌────────┐ ┌────────┐ ┌────────┐ │
│               │  │ Notes  │ │ DBMS   │ │ Project│ │
│ Pages         │  │        │ │        │ │        │ │
│               │  └────────┘ └────────┘ └────────┘ │
│ ▸ DBMS        │                                      │
│ ▸ Projects    │  Recently edited...                 │
│ ▸ Ideas       │                                      │
│               │                                      │
└───────────────┴──────────────────────────────────────┘
```

---

# 7. Sidebar

The sidebar should provide navigation.

It should contain:

* CloudNotes logo/name
* New Page button
* Search
* Home
* Pages
* Favorites
* Trash

Below these, display the user's pages.

Example:

```
CloudNotes

+ New Page

⌂ Home
🔍 Search
⭐ Favorites
🗑 Trash

MY PAGES

📄 DBMS Notes
📄 AI/ML Project
📄 Hackathon Ideas
📄 German Notes
```

The sidebar should remain visually consistent throughout the application.

---

# 8. Page System

A page represents an individual note.

Each page should contain:

* Title
* Optional icon
* Content
* Created timestamp
* Updated timestamp
* Favorite state

Example:

```
📚

DBMS Notes

Last edited 2 minutes ago

────────────────────────────

Database Management Systems

A database is an organized collection
of structured information...

## Normalization

Normalization is the process of...
```

---

# 9. Editor

The editor should provide a clean writing experience inspired by Notion.

Minimum functionality:

* Editable page title
* Editable page content
* Save functionality
* Delete page
* Favorite/unfavorite
* Auto-save or explicit save
* Last updated timestamp

The editor should visually resemble a modern document editor rather than a traditional HTML form.

Avoid making the interface look like:

```
Title: [___________]

Content:
[__________________]

[Submit]
```

Instead, use a document-style editor.

---

# 10. Content Model

Version 1 can use a simple text-based content model.

Each page contains:

```
id
title
icon
content
is_favorite
created_at
updated_at
```

The content can initially be stored as plain text or Markdown.

Do NOT implement a complicated block database for Version 1.

A future version can introduce block-based content.

---

# 11. Search

Users should be able to search pages.

Search should match:

* Page title
* Page content

Example:

```
Search: machine learning

Results:

📄 ML Notes
📄 AI Project
📄 KNN Explanation
```

The search interface should update results without requiring a full page reload.

---

# 12. Favorites

Users should be able to mark pages as favorites.

Favorite pages should appear in:

```
⭐ Favorites
```

The favorite action should be available from the page/editor interface.

---

# 13. Trash

Deleting a page should preferably move it into Trash rather than permanently deleting it immediately.

Trash should display deleted pages.

Version 1 may implement:

* Move to trash
* Restore
* Permanently delete

If implementation complexity becomes excessive, permanent deletion is acceptable as a fallback.

---

# 14. Backend

Build the backend as a REST API.

Recommended technology:

* Python
* FastAPI
* SQLAlchemy
* SQLite

The backend should be structured cleanly.

Suggested structure:

```
backend/
│
├── app/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   └── routes/
│       └── notes.py
│
├── requirements.txt
└── notes.db
```

---

# 15. REST API

The backend should expose the following endpoints.

### Create

```http
POST /api/notes
```

Creates a new page.

### Get all

```http
GET /api/notes
```

Returns all pages.

### Get single page

```http
GET /api/notes/{id}
```

Returns a specific page.

### Update

```http
PUT /api/notes/{id}
```

Updates a page.

### Delete

```http
DELETE /api/notes/{id}
```

Deletes or moves a page to trash.

### Favorite

```http
PATCH /api/notes/{id}/favorite
```

Toggles favorite state.

### Search

```http
GET /api/notes/search?q={query}
```

Searches notes.

---

# 16. Database

Use SQLite for Version 1.

Database table:

```
notes

id              INTEGER PRIMARY KEY
title           TEXT
icon            TEXT
content         TEXT
is_favorite     BOOLEAN
is_deleted      BOOLEAN
created_at      DATETIME
updated_at      DATETIME
```

SQLite is intentionally selected because:

* It is simple.
* It requires no separate database server.
* It is suitable for a small single-user deployment.
* It makes EC2 deployment easier.

---

# 17. Frontend

Recommended technology:

* React
* Vite
* JavaScript or TypeScript
* CSS / Tailwind CSS

The frontend should communicate with the backend exclusively through HTTP APIs.

Example:

```
React
   │
   │ HTTP
   ▼
FastAPI
   │
   ▼
SQLite
```

Do not store the primary note data only in browser localStorage.

The database must persist the notes.

---

# 18. UI/UX Requirements

The interface should feel:

* Modern
* Clean
* Professional
* Minimal
* Productivity-focused
* Not overly colorful
* Fast
* Responsive

Visual direction:

* Light primary workspace
* Dark or muted sidebar
* Subtle borders
* Rounded cards
* Good typography
* Generous whitespace
* Smooth hover states
* Minimal animations

Avoid:

* Excessive gradients
* Excessive glassmorphism
* Generic AI dashboard aesthetics
* Excessive glowing elements
* Unnecessary animations

The application should feel like a serious productivity tool.

---

# 19. Responsive Design

The application must work on:

* Desktop
* Laptop
* Tablet
* Mobile

On mobile:

* Sidebar should collapse.
* Navigation should remain accessible.
* Editor should occupy the available screen width.

---

# 20. Error Handling

The frontend should gracefully handle:

* Backend unavailable
* Failed API request
* Invalid note
* Empty title
* Missing page
* Database errors

Display useful messages rather than raw errors.

Example:

```
Unable to save your page.
Please try again.
```

---

# 21. Loading States

API operations should have appropriate loading states.

Examples:

```
Loading pages...

Saving...

Deleting...

Searching...
```

Avoid freezing the interface while requests are running.

---

# 22. Empty States

If there are no notes:

```
Your workspace is empty.

Create your first page to get started.

+ Create Page
```

If search returns nothing:

```
No pages found.

Try another search term.
```

---

# 23. Deployment Requirements

The application must be deployable on:

```
AWS EC2
Ubuntu
```

The deployment should include:

```
Internet
   ↓
EC2 Public IP
   ↓
Web Server
   ↓
Frontend
   ↓
Backend API
   ↓
SQLite
```

The application must be accessible through the EC2 public IP.

Example:

```
http://<EC2-PUBLIC-IP>
```

---

# 24. Security Group Requirements

Configure the EC2 Security Group to allow:

```
SSH
TCP
Port 22
Source: My IP

HTTP
TCP
Port 80
Source: 0.0.0.0/0
```

If required during development, the backend port may temporarily be opened for testing, but the final deployment should preferably expose the application through HTTP port 80.

SSH should not unnecessarily be exposed to the entire internet.

---

# 25. Deployment Architecture

Recommended final architecture:

```
                     INTERNET
                         │
                         ▼
                ┌─────────────────┐
                │   AWS EC2       │
                │    Ubuntu       │
                │                 │
                │    Nginx        │
                │      │          │
                │      ▼          │
                │   React App     │
                │      │          │
                │      ▼          │
                │   FastAPI       │
                │      │          │
                │      ▼          │
                │    SQLite       │
                └─────────────────┘
                         ▲
                         │
                        SSH
                         │
                    Developer
```

---

# 26. GitHub Repository

Recommended repository structure:

```
cloud-notes/
│
├── frontend/
│
├── backend/
│
├── README.md
├── .gitignore
└── deployment/
```

The README should contain:

1. Project overview
2. Features
3. Tech stack
4. Architecture
5. Local setup instructions
6. API documentation
7. Deployment instructions
8. Screenshots
9. AWS EC2 deployment information

Do NOT commit:

* AWS private keys
* `.env` files containing secrets
* SSH keys
* Passwords
* API keys

---

# 27. Acceptance Criteria

The project is considered complete when:

### Application

* [ ] User can create a page.
* [ ] User can view pages.
* [ ] User can edit pages.
* [ ] User can delete pages.
* [ ] User can favorite pages.
* [ ] User can search pages.
* [ ] Data persists after browser refresh.

### Backend

* [ ] REST API is implemented.
* [ ] CRUD endpoints work.
* [ ] Database persistence works.
* [ ] API handles errors.

### Frontend

* [ ] Dashboard works.
* [ ] Sidebar works.
* [ ] Editor works.
* [ ] Search works.
* [ ] Responsive UI works.
* [ ] Loading and empty states exist.

### AWS

* [ ] Ubuntu EC2 instance created.
* [ ] SSH connection works.
* [ ] Application deployed to EC2.
* [ ] Security Group configured.
* [ ] Website accessible publicly.
* [ ] Public IP successfully loads the application.

### Submission

* [ ] GitHub repository link.
* [ ] Public IP / deployed URL.
* [ ] Website screenshot.
* [ ] EC2 console screenshot.
* [ ] 3–5 line explanation of EC2, SSH and Security Groups.

---

# 28. Future Features

Potential Version 2 features:

* Authentication
* Multiple workspaces
* Rich text editor
* Block-based editing
* Drag-and-drop blocks
* Markdown support
* Tags
* Backlinks
* Page hierarchy
* File uploads
* Dark mode
* Collaboration
* Real-time synchronization
* AI-powered note summarization
* AI search

These features should NOT be implemented unless the core Version 1 application is already stable.

---

# 29. Product Principle

The primary principle is:

> Build a small application that feels polished rather than a large application that feels unfinished.

The application should prioritize:

```
Reliability
    >
Core functionality
    >
User experience
    >
Visual polish
    >
Extra features
```

The final product should demonstrate that a developer can take an application from:

```
CODE
  ↓
LOCAL DEVELOPMENT
  ↓
BACKEND + DATABASE
  ↓
AWS EC2
  ↓
SSH
  ↓
SECURITY GROUP
  ↓
PUBLIC INTERNET
```

without unnecessary complexity.

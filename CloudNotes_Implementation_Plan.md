# CloudNotes — Implementation Plan & Progress Tracker

## Project

**CloudNotes — A Lightweight Notion-Inspired Notes App**

Goal:

> Build → Test → Deploy → AWS EC2 → SSH → Security Group → Public Internet

---

# 🟢 PHASE 0 — Project Setup

### Goal

Set up the project structure and development environment.

### Tasks

* [x] Create GitHub repository
* [x] Create project root folder
* [x] Create `frontend/`
* [x] Create `backend/`
* [x] Initialize React + Vite
* [x] Initialize FastAPI
* [x] Create `.gitignore`
* [x] Create `README.md`
* [x] Make initial Git commit

### Expected Structure

```
cloud-notes/
│
├── frontend/
├── backend/
├── README.md
└── .gitignore
```

### Completion Criteria

* Frontend starts successfully.
* Backend starts successfully.
* Git repository is connected.
* Initial commit is pushed.

### Status

**✅ COMPLETED**

---

# 🔵 PHASE 1 — Backend Foundation

### Goal

Create the FastAPI backend and connect SQLite.

### Tasks

* [x] Create FastAPI application
* [x] Create `main.py`
* [x] Configure SQLite
* [x] Configure SQLAlchemy
* [x] Create database connection
* [x] Create Note model
* [x] Create Pydantic schemas
* [x] Create API router
* [x] Configure CORS
* [x] Start FastAPI locally
* [x] Verify `/docs`

### Database Model

```
notes

id
title
icon
content
is_favorite
is_deleted
created_at
updated_at
```

### Expected Result

```
http://localhost:8000/docs
```

Swagger UI should open successfully.

### Completion Criteria

* [x] FastAPI runs
* [x] SQLite database created
* [x] Note model works
* [x] Swagger UI works
* [x] Database connection works

### Status

**✅ COMPLETED**

---

# 🟣 PHASE 2 — CRUD REST API

### Goal

Implement all core Notes APIs.

### Tasks

* [x] Implement Create Note
* [x] Implement Get All Notes
* [x] Implement Get Single Note
* [x] Implement Update Note
* [x] Implement Delete Note
* [x] Implement Favorite/Unfavorite
* [x] Implement Search
* [x] Add validation
* [x] Add error handling

### API

```
POST   /api/notes
GET    /api/notes
GET    /api/notes/{id}
PUT    /api/notes/{id}
DELETE /api/notes/{id}

PATCH  /api/notes/{id}/favorite

GET    /api/notes/search?q={query}
```

### Test Using

```
FastAPI Swagger
Postman
pytest (automated unit test suite)
curl
```

### Completion Criteria

```
CREATE   ✅
READ     ✅
UPDATE   ✅
DELETE   ✅
SEARCH   ✅
FAVORITE ✅
```

### Status

**✅ COMPLETED**

---

# 🟠 PHASE 3 — Frontend Foundation

### Goal

Build the basic Notion-inspired interface.

### Tasks

* [x] Create application layout
* [x] Create sidebar
* [x] Create header
* [x] Create dashboard
* [x] Create page cards
* [x] Create New Page button
* [x] Create Search UI
* [x] Create Favorites section
* [x] Create Trash section
* [x] Add responsive layout
* [x] Add routing

### Main Layout

```
┌──────────────────────────────────────────┐
│              CloudNotes                  │
├──────────────┬───────────────────────────┤
│              │                           │
│  Sidebar     │       Main Content        │
│              │                           │
│  + New Page  │                           │
│  Home        │                           │
│  Search      │                           │
│  Favorites   │                           │
│  Trash       │                           │
│              │                           │
│  My Pages    │                           │
│              │                           │
└──────────────┴───────────────────────────┘
```

### Completion Criteria

* [x] Dashboard works
* [x] Sidebar works
* [x] Navigation works
* [x] Page cards render
* [x] Responsive layout works

### Status

**✅ COMPLETED**

---

# 🟡 PHASE 4 — Notion-Inspired Editor

### Goal

Create the actual note editing experience.

### Tasks

* [x] Create page editor
* [x] Editable title
* [x] Editable content
* [x] Page icon
* [x] Save button
* [x] Delete button
* [x] Favorite button
* [x] Last updated timestamp
* [x] Loading state
* [x] Saving state
* [x] Error state

### Editor Concept

```
        📚

     DBMS Notes

     Last edited 2 mins ago

──────────────────────────────

Database Management Systems

A database is an organized
collection of structured data...

Normalization
─────────────

...
```

### Important

Do NOT build a complicated Notion block editor yet.

Use a simple text/Markdown-style editor for Version 1.

### Completion Criteria

* [x] Create page
* [x] Edit title
* [x] Edit content
* [x] Save
* [x] Delete
* [x] Favorite

### Status

**✅ COMPLETED**

---

# 🟢 PHASE 5 — Connect Frontend + Backend

### Goal

Replace dummy frontend data with real database data.

### Tasks

* [x] Create API service layer
* [x] Connect GET notes
* [x] Connect CREATE note
* [x] Connect UPDATE note
* [x] Connect DELETE note
* [x] Connect FAVORITE
* [x] Connect SEARCH
* [x] Handle API loading states
* [x] Handle API errors
* [x] Handle empty states

### Data Flow

```
React
  │
  │ HTTP Request
  ▼
FastAPI
  │
  ▼
SQLAlchemy
  │
  ▼
SQLite
```

### Critical Test

```
Create Note
     ↓
Save to database
     ↓
Refresh browser
     ↓
Note still exists
```

### Completion Criteria

* [x] All CRUD operations work from UI
* [x] Database persists data
* [x] Refresh does not lose notes
* [x] Search works
* [x] Favorites work

### Status

**✅ COMPLETED**

---

# 🎨 PHASE 6 — UI/UX Polish

### Goal

Make the application look like a real product.

### Tasks

* [x] Improve typography
* [x] Improve spacing
* [x] Improve sidebar
* [x] Improve editor
* [x] Add icons
* [x] Add hover states
* [x] Add transitions
* [x] Improve buttons
* [x] Improve cards
* [x] Add empty states
* [x] Add loading states
* [x] Add error states
* [x] Mobile responsive design
* [x] Add favicon
* [x] Add application logo
* [x] Remove unnecessary UI elements

### Design Principle

```
Clean
Professional
Productivity-focused
Minimal
Fast
```

### Avoid

```
❌ Excessive gradients
❌ Excessive glassmorphism
❌ Generic AI dashboard design
❌ Too many animations
❌ Unnecessary features
```

### Completion Criteria

The application should feel like a **small polished productivity product**, not a college CRUD project.

### Status

**✅ COMPLETED**

---

# 🧪 PHASE 7 — Local Production Testing

### Goal

Make sure the application is stable BEFORE deploying to AWS.

### Test Checklist

### Create

* [x] Create note
* [x] Create multiple notes
* [x] Empty title validation

### Read

* [x] View notes
* [x] Open individual note
* [x] Refresh browser

### Update

* [x] Edit title
* [x] Edit content
* [x] Save changes
* [x] Refresh and verify

### Delete

* [x] Delete note
* [x] Verify it disappears

### Search

* [x] Search by title
* [x] Search by content
* [x] Test no results

### Favorites

* [x] Favorite
* [x] Unfavorite
* [x] View favorites

### General

* [x] Test mobile layout
* [x] Test backend restart
* [x] Test database persistence
* [x] Test API errors
* [x] Test loading states

### 🚨 IMPORTANT CHECKPOINT

**DO NOT DEPLOY TO AWS UNTIL THIS PHASE PASSES.**

### Status

**✅ COMPLETED**

---

# ☁️ PHASE 8 — AWS EC2 Setup

### Goal

Create the Ubuntu EC2 server.

### Tasks

* [x] Verify AWS account
* [x] Open AWS Console
* [x] Open EC2
* [x] Launch Instance
* [x] Select Ubuntu
* [x] Select free-tier eligible configuration
* [x] Create key pair
* [x] Configure Security Group
* [x] Launch instance
* [x] Wait for instance to become running
* [x] Get public IPv4 address

### Expected

```
EC2 Instance
      │
      ├── Ubuntu
      ├── Running
      ├── Public IPv4
      └── Security Group
```

### Completion Criteria

* [x] Instance running
* [x] Ubuntu selected
* [x] Key pair created
* [x] Public IP available

### Status

**✅ COMPLETED**

---

# 🔐 PHASE 9 — SSH Connection

### Goal

Connect your computer to the Ubuntu EC2 instance.

### Tasks

* [x] Download `.pem` key
* [x] Store key securely
* [x] Configure key permissions
* [x] Connect using SSH
* [x] Verify Ubuntu environment
* [x] Update packages
* [x] Install required software

### Connection Concept

```
Your Computer
      │
      │ SSH
      ▼
Ubuntu EC2
```

### Completion Criteria

You should successfully reach:

```
ubuntu@ip-xxx-xxx-xxx-xxx:~$
```

### Status

**✅ COMPLETED**

---

# 🚀 PHASE 10 — Backend Deployment

### Goal

Deploy FastAPI + SQLite to EC2.

### Tasks

* [x] Clone GitHub repository
* [x] Navigate to backend
* [x] Install Python
* [x] Create virtual environment
* [x] Install dependencies
* [x] Configure SQLite
* [x] Run FastAPI
* [x] Test backend on EC2
* [x] Configure backend to remain running

### Expected

```
EC2
 │
 └── backend/
      │
      ├── FastAPI
      ├── SQLAlchemy
      └── SQLite
```

### Completion Criteria

* [x] Backend starts successfully
* [x] Database works
* [x] API responds
* [x] CRUD works on EC2

### Status

**✅ COMPLETED**

---

# 🌐 PHASE 11 — Frontend Deployment

### Goal

Deploy the React frontend to EC2.

### Tasks

* [x] Install Node.js
* [x] Install frontend dependencies
* [x] Configure production API URL
* [x] Build React application
* [x] Install Nginx
* [x] Configure Nginx
* [x] Serve frontend
* [x] Configure API reverse proxy

### Final Architecture

```
                  INTERNET
                     │
                     ▼
              EC2 PUBLIC IP
                     │
                     ▼
                  NGINX
                  Port 80
                     │
             ┌───────┴───────┐
             │               │
             ▼               ▼
          React            FastAPI
         Frontend           API
                             │
                             ▼
                           SQLite
```

### Completion Criteria

* [ ] React production build works
* [ ] Nginx works
* [ ] Frontend loads
* [ ] Frontend communicates with FastAPI
* [ ] No localhost API references remain

### Status

**⬜ NOT STARTED**

---

# 🛡️ PHASE 12 — Security Group Configuration

### Goal

Allow users to access the application through the internet.

### Required Rules

```
┌────────┬────────┬──────────────┐
│ Port   │ Type   │ Source       │
├────────┼────────┼──────────────┤
│ 22     │ SSH    │ My IP       │
│ 80     │ HTTP   │ 0.0.0.0/0   │
└────────┴────────┴──────────────┘
```

### Important

SSH should preferably be restricted to your IP rather than:

```
0.0.0.0/0
```

Port 80 needs to be publicly accessible.

### Completion Criteria

Open:

```
http://<EC2-PUBLIC-IP>
```

and the CloudNotes application should load.

### Status

**⬜ NOT STARTED**

---

# 🧪 PHASE 13 — Final Deployment Testing

### Goal

Verify that the publicly deployed application actually works.

### Website

* [ ] Public IP loads
* [ ] Dashboard loads
* [ ] Sidebar works
* [ ] Create note works
* [ ] View note works
* [ ] Edit note works
* [ ] Delete note works
* [ ] Search works
* [ ] Favorites work
* [ ] Refresh preserves data

### Deployment

* [ ] Nginx running
* [ ] FastAPI running
* [ ] SQLite accessible
* [ ] Security Group correct
* [ ] No localhost URLs
* [ ] No browser console errors
* [ ] No broken assets

### Critical Test

Open the website using:

```
http://<EC2-PUBLIC-IP>
```

from your normal browser.

### Status

**⬜ NOT STARTED**

---

# 📸 PHASE 14 — Submission Preparation

### Goal

Prepare exactly what the assignment requires.

## 1. GitHub Repository

* [ ] Final code pushed
* [ ] README completed
* [ ] Repository link copied

## 2. Deployed Website

Copy:

```
http://<EC2-PUBLIC-IP>
```

## 3. Website Screenshot

Take a screenshot showing:

* CloudNotes application
* Working UI
* Public IP in browser address bar if possible

## 4. EC2 Screenshot

Take AWS Console screenshot showing:

* EC2 instance
* Instance state
* Ubuntu
* Public IPv4 address

## 5. Learning Note

Write 3–5 lines explaining:

* What EC2 is
* What SSH is
* What Security Groups do
* How the application was deployed

### Status

**⬜ NOT STARTED**

---

# 🏁 PHASE 15 — AWS Cleanup

### Goal

Avoid unnecessary AWS charges after evaluation.

### Before Evaluation

* [ ] Keep EC2 running as instructed.

### After Evaluation

* [ ] Stop EC2 if you need to preserve it
* [ ] Terminate EC2 when completely finished
* [ ] Remove unnecessary resources
* [ ] Check AWS Billing dashboard

### Status

**⬜ NOT STARTED**

---

# 📊 MASTER PROGRESS TRACKER

```
CLOUDNOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 0   Project Setup              ⬜
PHASE 1   Backend Foundation         ⬜
PHASE 2   CRUD REST API              ⬜
PHASE 3   Frontend Foundation        ⬜
PHASE 4   Notion Editor              ⬜
PHASE 5   Frontend + Backend         ⬜
PHASE 6   UI/UX Polish               ⬜
PHASE 7   Local Testing              ⬜
PHASE 8   AWS EC2 Setup              ⬜
PHASE 9   SSH                        ⬜
PHASE 10  Backend Deployment         ⬜
PHASE 11  Frontend Deployment        ⬜
PHASE 12  Security Group             ⬜
PHASE 13  Final Testing              ⬜
PHASE 14  Submission                 ⬜
PHASE 15  AWS Cleanup                ⬜

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CURRENT PHASE:
PHASE 0 — Project Setup

OVERALL PROGRESS:
0 / 15 phases completed
```

---

# 🔥 DEVELOPMENT RULES

## Rule 1 — Don't overbuild

The goal is NOT:

```
Build a complete Notion clone
```

The goal is:

```
Build a polished Notion-inspired notes app
+
Deploy it successfully on AWS EC2
```

---

## Rule 2 — Finish one phase before moving on

```
Phase 0
   ↓
Phase 1
   ↓
Phase 2
   ↓
...
```

Do not start AWS deployment while the local application is broken.

---

## Rule 3 — Test every major feature

Every feature should be tested before moving forward.

```
Build
 ↓
Test
 ↓
Fix
 ↓
Commit
 ↓
Next feature
```

---

## Rule 4 — Commit regularly

Recommended commits:

```
feat: initialize project
feat: add FastAPI backend
feat: implement notes CRUD API
feat: add dashboard UI
feat: add note editor
feat: connect frontend to API
feat: add search and favorites
style: polish CloudNotes UI
deploy: configure EC2
deploy: configure nginx
docs: add deployment instructions
```

---

# 🎯 FINAL DEFINITION OF DONE

CloudNotes is complete when this entire flow works:

```
                 YOUR CODE
                     │
                     ▼
             LOCAL DEVELOPMENT
                     │
                     ▼
            React + FastAPI
                     │
                     ▼
                  SQLite
                     │
                     ▼
                GitHub
                     │
                     ▼
              AWS EC2 Ubuntu
                     │
                    SSH
                     │
                     ▼
                 NGINX
                     │
                     ▼
              PUBLIC INTERNET
                     │
                     ▼
        http://<EC2-PUBLIC-IP>
                     │
                     ▼
              ☁️ CLOUDNOTES
```

The final application must allow:

```
CREATE ✅
READ   ✅
UPDATE ✅
DELETE ✅
SEARCH ✅
FAVORITE ✅
PERSISTENCE ✅
PUBLIC ACCESS ✅
```

And the AWS portion must demonstrate:

```
EC2 ✅
SSH ✅
Security Groups ✅
Public IP ✅
Deployment ✅
```

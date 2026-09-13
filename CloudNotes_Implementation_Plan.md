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

* [ ] Create GitHub repository
* [ ] Create project root folder
* [ ] Create `frontend/`
* [ ] Create `backend/`
* [ ] Initialize React + Vite
* [ ] Initialize FastAPI
* [ ] Create `.gitignore`
* [ ] Create `README.md`
* [ ] Make initial Git commit

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

**⬜ NOT STARTED**

---

# 🔵 PHASE 1 — Backend Foundation

### Goal

Create the FastAPI backend and connect SQLite.

### Tasks

* [ ] Create FastAPI application
* [ ] Create `main.py`
* [ ] Configure SQLite
* [ ] Configure SQLAlchemy
* [ ] Create database connection
* [ ] Create Note model
* [ ] Create Pydantic schemas
* [ ] Create API router
* [ ] Configure CORS
* [ ] Start FastAPI locally
* [ ] Verify `/docs`

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

* [ ] FastAPI runs
* [ ] SQLite database created
* [ ] Note model works
* [ ] Swagger UI works
* [ ] Database connection works

### Status

**⬜ NOT STARTED**

---

# 🟣 PHASE 2 — CRUD REST API

### Goal

Implement all core Notes APIs.

### Tasks

* [ ] Implement Create Note
* [ ] Implement Get All Notes
* [ ] Implement Get Single Note
* [ ] Implement Update Note
* [ ] Implement Delete Note
* [ ] Implement Favorite/Unfavorite
* [ ] Implement Search
* [ ] Add validation
* [ ] Add error handling

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
curl
```

### Completion Criteria

```
CREATE  ✅
READ    ✅
UPDATE  ✅
DELETE  ✅
SEARCH  ✅
FAVORITE ✅
```

### Status

**⬜ NOT STARTED**

---

# 🟠 PHASE 3 — Frontend Foundation

### Goal

Build the basic Notion-inspired interface.

### Tasks

* [ ] Create application layout
* [ ] Create sidebar
* [ ] Create header
* [ ] Create dashboard
* [ ] Create page cards
* [ ] Create New Page button
* [ ] Create Search UI
* [ ] Create Favorites section
* [ ] Create Trash section
* [ ] Add responsive layout
* [ ] Add routing

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

* [ ] Dashboard works
* [ ] Sidebar works
* [ ] Navigation works
* [ ] Page cards render
* [ ] Responsive layout works

### Status

**⬜ NOT STARTED**

---

# 🟡 PHASE 4 — Notion-Inspired Editor

### Goal

Create the actual note editing experience.

### Tasks

* [ ] Create page editor
* [ ] Editable title
* [ ] Editable content
* [ ] Page icon
* [ ] Save button
* [ ] Delete button
* [ ] Favorite button
* [ ] Last updated timestamp
* [ ] Loading state
* [ ] Saving state
* [ ] Error state

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

* [ ] Create page
* [ ] Edit title
* [ ] Edit content
* [ ] Save
* [ ] Delete
* [ ] Favorite

### Status

**⬜ NOT STARTED**

---

# 🟢 PHASE 5 — Connect Frontend + Backend

### Goal

Replace dummy frontend data with real database data.

### Tasks

* [ ] Create API service layer
* [ ] Connect GET notes
* [ ] Connect CREATE note
* [ ] Connect UPDATE note
* [ ] Connect DELETE note
* [ ] Connect FAVORITE
* [ ] Connect SEARCH
* [ ] Handle API loading states
* [ ] Handle API errors
* [ ] Handle empty states

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

* [ ] All CRUD operations work from UI
* [ ] Database persists data
* [ ] Refresh does not lose notes
* [ ] Search works
* [ ] Favorites work

### Status

**⬜ NOT STARTED**

---

# 🎨 PHASE 6 — UI/UX Polish

### Goal

Make the application look like a real product.

### Tasks

* [ ] Improve typography
* [ ] Improve spacing
* [ ] Improve sidebar
* [ ] Improve editor
* [ ] Add icons
* [ ] Add hover states
* [ ] Add transitions
* [ ] Improve buttons
* [ ] Improve cards
* [ ] Add empty states
* [ ] Add loading states
* [ ] Add error states
* [ ] Mobile responsive design
* [ ] Add favicon
* [ ] Add application logo
* [ ] Remove unnecessary UI elements

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

**⬜ NOT STARTED**

---

# 🧪 PHASE 7 — Local Production Testing

### Goal

Make sure the application is stable BEFORE deploying to AWS.

### Test Checklist

### Create

* [ ] Create note
* [ ] Create multiple notes
* [ ] Empty title validation

### Read

* [ ] View notes
* [ ] Open individual note
* [ ] Refresh browser

### Update

* [ ] Edit title
* [ ] Edit content
* [ ] Save changes
* [ ] Refresh and verify

### Delete

* [ ] Delete note
* [ ] Verify it disappears

### Search

* [ ] Search by title
* [ ] Search by content
* [ ] Test no results

### Favorites

* [ ] Favorite
* [ ] Unfavorite
* [ ] View favorites

### General

* [ ] Test mobile layout
* [ ] Test backend restart
* [ ] Test database persistence
* [ ] Test API errors
* [ ] Test loading states

### 🚨 IMPORTANT CHECKPOINT

**DO NOT DEPLOY TO AWS UNTIL THIS PHASE PASSES.**

### Status

**⬜ NOT STARTED**

---

# ☁️ PHASE 8 — AWS EC2 Setup

### Goal

Create the Ubuntu EC2 server.

### Tasks

* [ ] Verify AWS account
* [ ] Open AWS Console
* [ ] Open EC2
* [ ] Launch Instance
* [ ] Select Ubuntu
* [ ] Select free-tier eligible configuration
* [ ] Create key pair
* [ ] Configure Security Group
* [ ] Launch instance
* [ ] Wait for instance to become running
* [ ] Get public IPv4 address

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

* [ ] Instance running
* [ ] Ubuntu selected
* [ ] Key pair created
* [ ] Public IP available

### Status

**⬜ NOT STARTED**

---

# 🔐 PHASE 9 — SSH Connection

### Goal

Connect your computer to the Ubuntu EC2 instance.

### Tasks

* [ ] Download `.pem` key
* [ ] Store key securely
* [ ] Configure key permissions
* [ ] Connect using SSH
* [ ] Verify Ubuntu environment
* [ ] Update packages
* [ ] Install required software

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

**⬜ NOT STARTED**

---

# 🚀 PHASE 10 — Backend Deployment

### Goal

Deploy FastAPI + SQLite to EC2.

### Tasks

* [ ] Clone GitHub repository
* [ ] Navigate to backend
* [ ] Install Python
* [ ] Create virtual environment
* [ ] Install dependencies
* [ ] Configure SQLite
* [ ] Run FastAPI
* [ ] Test backend on EC2
* [ ] Configure backend to remain running

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

* [ ] Backend starts successfully
* [ ] Database works
* [ ] API responds
* [ ] CRUD works on EC2

### Status

**⬜ NOT STARTED**

---

# 🌐 PHASE 11 — Frontend Deployment

### Goal

Deploy the React frontend to EC2.

### Tasks

* [ ] Install Node.js
* [ ] Install frontend dependencies
* [ ] Configure production API URL
* [ ] Build React application
* [ ] Install Nginx
* [ ] Configure Nginx
* [ ] Serve frontend
* [ ] Configure API reverse proxy

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

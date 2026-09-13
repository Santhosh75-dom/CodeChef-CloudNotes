from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routes import notes

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CloudNotes API",
    description="RESTful Backend API for CloudNotes workspace application",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes.router)


@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to CloudNotes API",
        "docs": "/docs",
    }

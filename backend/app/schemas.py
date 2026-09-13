from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class NoteBase(BaseModel):
    title: Optional[str] = "Untitled"
    icon: Optional[str] = "📄"
    content: Optional[str] = ""
    is_favorite: Optional[bool] = False
    is_deleted: Optional[bool] = False


class NoteCreate(BaseModel):
    title: Optional[str] = "Untitled"
    icon: Optional[str] = "📄"
    content: Optional[str] = ""


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    icon: Optional[str] = None
    content: Optional[str] = None
    is_favorite: Optional[bool] = None
    is_deleted: Optional[bool] = None


class NoteFavoriteUpdate(BaseModel):
    is_favorite: Optional[bool] = None


class NoteResponse(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

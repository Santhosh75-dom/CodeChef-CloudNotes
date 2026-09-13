from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models, schemas


def get_notes(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    include_deleted: bool = False,
    only_favorites: bool = False,
) -> List[models.Note]:
    query = db.query(models.Note)
    if not include_deleted:
        query = query.filter(models.Note.is_deleted == False)
    if only_favorites:
        query = query.filter(models.Note.is_favorite == True)
    return (
        query.order_by(models.Note.updated_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_deleted_notes(db: Session) -> List[models.Note]:
    return (
        db.query(models.Note)
        .filter(models.Note.is_deleted == True)
        .order_by(models.Note.updated_at.desc())
        .all()
    )


def get_note(db: Session, note_id: int) -> Optional[models.Note]:
    return db.query(models.Note).filter(models.Note.id == note_id).first()


def create_note(db: Session, note: schemas.NoteCreate) -> models.Note:
    db_note = models.Note(
        title=note.title if note.title and note.title.strip() else "Untitled",
        icon=note.icon or "📄",
        content=note.content or "",
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


def update_note(
    db: Session, note_id: int, note_update: schemas.NoteUpdate
) -> Optional[models.Note]:
    db_note = get_note(db, note_id)
    if not db_note:
        return None

    update_data = note_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_note, key, value)

    db_note.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_note)
    return db_note


def toggle_favorite(
    db: Session, note_id: int, is_favorite: Optional[bool] = None
) -> Optional[models.Note]:
    db_note = get_note(db, note_id)
    if not db_note:
        return None

    if is_favorite is None:
        db_note.is_favorite = not db_note.is_favorite
    else:
        db_note.is_favorite = is_favorite

    db_note.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_note)
    return db_note


def delete_note(
    db: Session, note_id: int, permanent: bool = False
) -> Optional[models.Note]:
    db_note = get_note(db, note_id)
    if not db_note:
        return None

    if permanent:
        db.delete(db_note)
        db.commit()
        return db_note
    else:
        db_note.is_deleted = True
        db_note.updated_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(db_note)
        return db_note


def restore_note(db: Session, note_id: int) -> Optional[models.Note]:
    db_note = get_note(db, note_id)
    if not db_note:
        return None

    db_note.is_deleted = False
    db_note.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_note)
    return db_note


def search_notes(db: Session, query_str: str) -> List[models.Note]:
    pattern = f"%{query_str}%"
    return (
        db.query(models.Note)
        .filter(models.Note.is_deleted == False)
        .filter(
            or_(
                models.Note.title.ilike(pattern),
                models.Note.content.ilike(pattern),
            )
        )
        .order_by(models.Note.updated_at.desc())
        .all()
    )

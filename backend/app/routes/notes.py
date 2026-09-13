from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/api/notes", tags=["Notes"])


@router.post(
    "", response_model=schemas.NoteResponse, status_code=status.HTTP_201_CREATED
)
def create_note(
    note: schemas.NoteCreate, db: Session = Depends(get_db)
):
    return crud.create_note(db=db, note=note)


@router.get("", response_model=List[schemas.NoteResponse])
def read_notes(
    skip: int = 0,
    limit: int = 100,
    include_deleted: bool = False,
    only_favorites: bool = False,
    db: Session = Depends(get_db),
):
    return crud.get_notes(
        db,
        skip=skip,
        limit=limit,
        include_deleted=include_deleted,
        only_favorites=only_favorites,
    )


@router.get("/trash", response_model=List[schemas.NoteResponse])
def read_trash(db: Session = Depends(get_db)):
    return crud.get_deleted_notes(db)


@router.get("/search", response_model=List[schemas.NoteResponse])
def search_notes(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    return crud.search_notes(db, query_str=q)


@router.get("/{note_id}", response_model=schemas.NoteResponse)
def read_note(note_id: int, db: Session = Depends(get_db)):
    db_note = crud.get_note(db, note_id=note_id)
    if not db_note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    return db_note


@router.put("/{note_id}", response_model=schemas.NoteResponse)
def update_note(
    note_id: int,
    note_update: schemas.NoteUpdate,
    db: Session = Depends(get_db),
):
    updated_note = crud.update_note(db, note_id=note_id, note_update=note_update)
    if not updated_note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    return updated_note


@router.patch("/{note_id}/favorite", response_model=schemas.NoteResponse)
def toggle_favorite(
    note_id: int,
    fav_payload: Optional[schemas.NoteFavoriteUpdate] = None,
    db: Session = Depends(get_db),
):
    is_fav = fav_payload.is_favorite if fav_payload else None
    updated_note = crud.toggle_favorite(db, note_id=note_id, is_favorite=is_fav)
    if not updated_note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    return updated_note


@router.post("/{note_id}/restore", response_model=schemas.NoteResponse)
def restore_note(note_id: int, db: Session = Depends(get_db)):
    restored = crud.restore_note(db, note_id=note_id)
    if not restored:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    return restored


@router.delete("/{note_id}", response_model=schemas.NoteResponse)
def delete_note(
    note_id: int, permanent: bool = False, db: Session = Depends(get_db)
):
    deleted_note = crud.delete_note(db, note_id=note_id, permanent=permanent)
    if not deleted_note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    return deleted_note

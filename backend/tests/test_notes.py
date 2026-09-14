import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_create_note():
    response = client.post(
        "/api/notes",
        json={"title": "Test Note", "icon": "🚀", "content": "This is a test note content."},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Note"
    assert data["icon"] == "🚀"
    assert data["content"] == "This is a test note content."
    assert data["is_favorite"] is False
    assert data["is_deleted"] is False
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


def test_create_note_default_values():
    response = client.post("/api/notes", json={})
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Untitled"
    assert data["icon"] == "📄"
    assert data["content"] == ""


def test_get_notes():
    client.post("/api/notes", json={"title": "Note 1", "content": "First note"})
    client.post("/api/notes", json={"title": "Note 2", "content": "Second note"})

    response = client.get("/api/notes")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_get_single_note():
    create_res = client.post("/api/notes", json={"title": "Single Note", "content": "Content"})
    note_id = create_res.json()["id"]

    response = client.get(f"/api/notes/{note_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == note_id
    assert data["title"] == "Single Note"


def test_get_single_note_not_found():
    response = client.get("/api/notes/99999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Note not found"


def test_update_note():
    create_res = client.post("/api/notes", json={"title": "Old Title", "content": "Old Content"})
    note_id = create_res.json()["id"]

    update_res = client.put(
        f"/api/notes/{note_id}",
        json={"title": "Updated Title", "content": "Updated Content", "icon": "⭐"},
    )
    assert update_res.status_code == 200
    data = update_res.json()
    assert data["title"] == "Updated Title"
    assert data["content"] == "Updated Content"
    assert data["icon"] == "⭐"


def test_toggle_favorite():
    create_res = client.post("/api/notes", json={"title": "Fav Note"})
    note_id = create_res.json()["id"]

    # Toggle favorite to true
    fav_res = client.patch(f"/api/notes/{note_id}/favorite", json={"is_favorite": True})
    assert fav_res.status_code == 200
    assert fav_res.json()["is_favorite"] is True

    # Toggle favorite without body (flips value)
    fav_res_flip = client.patch(f"/api/notes/{note_id}/favorite")
    assert fav_res_flip.status_code == 200
    assert fav_res_flip.json()["is_favorite"] is False


def test_soft_delete_and_restore():
    create_res = client.post("/api/notes", json={"title": "Note to Delete"})
    note_id = create_res.json()["id"]

    # Soft delete
    del_res = client.delete(f"/api/notes/{note_id}")
    assert del_res.status_code == 200
    assert del_res.json()["is_deleted"] is True

    # Main list should not contain deleted note
    get_res = client.get("/api/notes")
    assert len(get_res.json()) == 0

    # Trash list should contain deleted note
    trash_res = client.get("/api/notes/trash")
    assert len(trash_res.json()) == 1
    assert trash_res.json()[0]["id"] == note_id

    # Restore note
    restore_res = client.post(f"/api/notes/{note_id}/restore")
    assert restore_res.status_code == 200
    assert restore_res.json()["is_deleted"] is False

    # Main list should contain restored note
    get_res_after = client.get("/api/notes")
    assert len(get_res_after.json()) == 1


def test_permanent_delete():
    create_res = client.post("/api/notes", json={"title": "Permanently Deleted Note"})
    note_id = create_res.json()["id"]

    del_res = client.delete(f"/api/notes/{note_id}?permanent=true")
    assert del_res.status_code == 200

    # Getting single note returns 404
    get_res = client.get(f"/api/notes/{note_id}")
    assert get_res.status_code == 404


def test_search_notes():
    client.post("/api/notes", json={"title": "Python FastAPI Guide", "content": "Learn web dev"})
    client.post("/api/notes", json={"title": "React Basics", "content": "Learn frontend dev with hooks"})
    client.post("/api/notes", json={"title": "Grocery List", "content": "Milk, Eggs, Bread"})

    search_res = client.get("/api/notes/search?q=FastAPI")
    assert search_res.status_code == 200
    data = search_res.json()
    assert len(data) == 1
    assert data[0]["title"] == "Python FastAPI Guide"

    search_res_content = client.get("/api/notes/search?q=frontend")
    assert search_res_content.status_code == 200
    data_content = search_res_content.json()
    assert len(data_content) == 1
    assert data_content[0]["title"] == "React Basics"

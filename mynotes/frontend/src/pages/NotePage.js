import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let noteId = useParams();
  let [note, setNote] = useState(null);
  let navigate = useNavigate();

  let getNote = async () => {
    if (noteId.id === "new") return;
    let response = await fetch(`/api/notes/${noteId.id}/`);
    let data = await response.json();
    setNote(data);
  };
  useEffect(() => {
    getNote();
  }, [noteId.id]);

  let createNote = async () => {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`/api/notes/${noteId.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    await fetch(`/api/notes/${noteId.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  let handleSubmit = async () => {
    if (noteId.id !== "new" && note.body === "") {
      deleteNote();
    } else if (noteId.id !== "new") {
      updateNote();
    } else if (noteId.id === "new" && note.body !== null) {
      createNote();
    }
    navigate("/");
  };
  let handleChange = async (value) => {
    setNote((note) => ({ ...note, body: value }));
  };
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId.id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;

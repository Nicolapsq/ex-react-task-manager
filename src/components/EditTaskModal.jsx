import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);

  const changeEditedTask = (key, e) => {
    setEditedTask((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const { title, description, status } = editedTask;
  const editFormRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <Modal
      title="Modifica task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>
            Nome task:
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => changeEditedTask("title", e)}
            />
          </label>
          <label>
            Descrizione:
            <textarea
              value={description}
              onChange={(e) => changeEditedTask("description", e)}
            ></textarea>
          </label>
          <label>
            Stato:
            <select
              value={status}
              onChange={(e) => changeEditedTask("status", e)}
            >
              {["To do", "Doing", "Done"].map((value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Salva</button>
          <button type="button" onClick={onClose}>Annulla</button>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
}

import React from "react";
import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskListContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
import { useState } from "react";

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useTask();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  console.log(showModal);

  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) return <p>Task non trovata</p>;

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo");
      //   console.log("Task eliminata con successo");
      navigate("/");
      alert("Eliminazione task avvenuta con successo");
      console.log("Elimino task", task.id);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert("Task modificata con successo");
      setShowEditModal(false);
      //   console.log("Task modificata con successo");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>Dettagli Task</h2>
      <p>
        <strong>Nome:</strong> {task.title}
      </p>
      <p>
        <strong>Descrizione:</strong> {task.description}
      </p>
      <p>
        <strong>Stato:</strong> {task.status}
      </p>
      <p>
        <strong>Data di creazione:</strong>{" "}
        {new Date(task.createdAt).toLocaleString()}
      </p>

      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Elimina task
      </button>

      <button
        onClick={() => setShowEditModal(true)}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Modifica task
      </button>
      {/* Modale di Eliminazione Task */}
      <Modal
        show={showModal}
        title="Conferma eliminazione"
        content={<p>Sei sicuro di voler eliminare la task?</p>}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />

      {/* Modale di Modifica Task */}
      <EditTaskModal
        task={task}
        show={showEditModal}
        title="Conferma modifica"
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdateTask}
      />
    </div>
  );
}

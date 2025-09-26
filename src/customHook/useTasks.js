import { useState, useEffect } from "react";

const { VITE_API_URL, VITE_API_PORT } = import.meta.env;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${VITE_API_URL}:${VITE_API_PORT}/tasks`);
        if (!res.ok) throw new Error("Errore nel recupero dei task");
        const data = await res.json();
        setTasks(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Funzioni CRUD (vuote per ora)
  const addTask = async (newTask) => {
    // Logica per aggiungere un task
    // chiamata ajax
    const response = await fetch(`${VITE_API_URL}:${VITE_API_PORT}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const { success, message, task } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    setTasks((prev) => [...prev, task]);
  };

  const removeTask = async (taskId) => {
    // Logica per rimuovere un task
    // chiamata ajax
    const response = await fetch(
      `${VITE_API_URL}:${VITE_API_PORT}/tasks/${taskId}`,
      {
        method: "DELETE",
        // headers: {"Content-Type": "application/json"},
        // body: JSON.stringify(newTask)
      }
    );
    const { success, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const updateTask = async (updatedTask) => {
    // Logica per aggiornare un task
    // chiamata ajax
    const response = await fetch(
      `${VITE_API_URL}:${VITE_API_PORT}/tasks/${updatedTask.id}`,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedTask)
      }
    );
    const { success, message, task: newTask } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    setTasks((prev) => prev.map((oldTask) => (oldTask.id === newTask.id ? newTask : oldTask)));
  };

  return { tasks, loading, error, addTask, removeTask, updateTask };
}

import { useState, useRef, useMemo } from "react";
import { useTask } from "../context/TaskListContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
  const [title, setTitle] = useState(""); // input controllato
  const descriptionRef = useRef(); // textarea non controllata
  const statusRef = useRef(); // select non controllata

  const { addTask } = useTask(); // funzione globale dal contesto

  // Validazione

  const titleError = useMemo(() => {
    if (!title.trim()) return "Il titolo non può essere vuoto";
    if ([...title].some((ch) => symbols.includes(ch)))
      return "Il titolo non può contenere simboli speciali";
    return "";
  }, [title]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titleError) return;

    // Creiamo un nuovo task usando i valori dai ref e dallo state
    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
      createdAt: new Date().toISOString(),
    };

    try {
      await addTask(newTask);
      // Resettiamo il form
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
      alert("Task creata");
      console.log(newTask);
    } catch (err) {
      alert("Errore durante la creazione:", err.message);
      console.log(err.message);
    }

    // console.log("Task aggiunto:", newTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Aggiungi Task</h2>

      {/* Input controllato */}
      <input
        type="text"
        placeholder="Nome del task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleError && (
        <p style={{ color: "red" || "green" }}>
          {titleError}
        </p>
      )}

      {/* Textarea non controllata */}
      <textarea placeholder="Descrizione" ref={descriptionRef} />

      {/* Select non controllata */}
      <label>
        Stato
        <select ref={statusRef} defaultValue="To do">
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </label>

      <button type="submit" disabled={titleError}>
        Aggiungi Task
      </button>
    </form>
  );
}

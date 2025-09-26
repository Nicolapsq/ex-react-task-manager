import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useTask } from "../context/TaskListContext";
import { redirect } from "react-router-dom";
import TaskRow from "../components/TaskRow";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

/* Funzione di Debounce "Sintassi Base" */
function debounce(callback, delay) {
  let timer;
  return function (value) {
    clearTimeout(timer); // resetta il timer se la funzione viene richiamata
    timer = setTimeout(() => {
      callback(value); // esegue la funzione dopo il ritardo
    }, delay);
  };
}

export default function TaskList() {
  const { tasks, loading } = useTask();

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncesetSearchQuery = useCallback(debounce(setSearchQuery, 1000), []);

  const sortIcon = sortOrder === 1 ? <FaArrowDown /> : <FaArrowUp />;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortedAndFilteredTasks = useMemo(() => {
    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let comparison;
        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          const stausOptions = ["To do", "Doing", "Done"];
          comparison =
            stausOptions.indexOf(a.status) - stausOptions.indexOf(b.status);
        } else if (sortBy === "createdAt") {
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }

        return comparison * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  if (loading) return <p>Caricamento task...</p>;
  if (!tasks.length) return <p>Nessun task disponibile</p>;

  return (
    <>
      <input
        type="text"
        placeholder="Cerca"
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        onChange={(e) => debouncesetSearchQuery(e.target.value)}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{ border: "1px solid #ccc", padding: "8px" }}
              onClick={() => handleSort("title")}
            >
              Titolo {sortBy === "title" && sortIcon}
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Descrizione
            </th>
            <th
              style={{ border: "1px solid #ccc", padding: "8px" }}
              onClick={() => handleSort("status")}
            >
              Stato {sortBy === "status" && sortIcon}
            </th>
            <th
              style={{ border: "1px solid #ccc", padding: "8px" }}
              onClick={() => handleSort("createdAt")}
            >
              Creato il {sortBy === "createdAt" && sortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
}

import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";

import { TaskProvider } from "./context/TaskListContext";

export default function app() {
  return (
    <>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<TaskList />}></Route>
              <Route path="/AddTask" element={<AddTask />}></Route>
              <Route path="/Task/:id" element={<TaskDetail />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </>
  );
}

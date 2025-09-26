import { createContext, useContext } from "react";

import useTasks from "../customHook/useTasks.js";

// const {VITE_API_URL, VITE_API_PORT} = import.meta.env;

const TaskListContext = createContext();

function TaskProvider({ children }) {

    const tasksData = useTasks();

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   fetch(`${VITE_API_URL}:${VITE_API_PORT}/tasks`)
//       .then((res) => res.json())
//       .then((data) => {
//         setTasks(data);
//         setLoading(false);
//         console.log(data);
//       })
//       .catch((err) => {
//         console.error("Errore fetch tasks:", err);
//         setLoading(false);
//       });
//   }, []);

  return (
    // <TaskListContext.Provider value={{ tasks, loading }}>
    <TaskListContext.Provider value={ {...tasksData} }>
      {children}
    </TaskListContext.Provider>
  );
};

function useTask() {
    const TaskContext = useContext(TaskListContext);
    return TaskContext;
}

export {TaskProvider, useTask};
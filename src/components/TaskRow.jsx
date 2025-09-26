import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function TaskRow({ task }) {
  return (
    <tr key={task.id}>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
        <Link to={`/task/${task.id}`}>
            {task.title}
        </Link>
        </td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {task.description}
      </td>
      <td
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          backgroundColor:
            task.status === "To do"
              ? "#f28b82"
              : task.status === "Doing"
              ? "#fff475"
              : task.status === "Done"
              ? "#81c995"
              : "transparent",
        }}
      >
        {task.status}
      </td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {new Date(task.createdAt).toLocaleString()}
      </td>
    </tr>
  );
});

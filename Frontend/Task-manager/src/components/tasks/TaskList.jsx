import { useState } from "react";
import Discription from "./Discription";
import ActionButton from "./ActionButtons";
import SubtaskModal from "./SubtaskModal";

const TaskList = ({ tasks = [], onEdit, onDelete, isAdmin }) => {
  const [openTaskId, setOpenTaskId] = useState(null);

  if (!tasks.length) {
    return (
      <div className="bg-white border p-4">
        <p>No tasks found</p>
      </div>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white border p-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">File</th>
            <th className="border p-2">SubTasks</th>
            {isAdmin && <th className="border p-2">Added By</th>}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50 align-top">

              <td className="border p-2 font-semibold">
                {task.title}
              </td>

              <td className="border p-2 max-w-xs">
                <Discription text={task.description} />
              </td>

              <td className="border p-2">{task.priority}</td>

              <td className="border p-2">{task.status}</td>

              <td className="border p-2">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "-"}
              </td>

              <td className="border p-2">
                {task.file ? (

                  <a
                    href={`http://localhost:5001/uploads/${task.file.replaceAll(
                      "\\",
                      "/"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-900 font-medium underline"
                  >
                    View
                  </a>
                ) : (
                  "-"
                )}
              </td>
                           <td className="border p-2">
           <SubtaskModal/>
              </td>



              {isAdmin && (
                <td className="border p-2">
                  {task.user ? (
                    <>
                      <p className="font-medium">{task.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {task.user.role}
                      </p>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              )}

              <td className="border p-2">
                <div className="flex gap-2">
                  <ActionButton
                    onClick={() => onEdit(task)}
                    className="bg-teal-950"
                  >
                    Edit
                  </ActionButton>

                  {isAdmin && (
                    <ActionButton
                      onClick={() => handleDelete(task._id)}
                      className="bg-orange-600"
                    >
                      Delete
                    </ActionButton>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

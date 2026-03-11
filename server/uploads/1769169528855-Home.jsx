import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, deleteTask, fetchTasks, updateTask } from "../api/tasks";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../constants/taskOptions";
import Pagination from "./tasks/Pagination";
import TaskFilters from "./tasks/TaskFilters";
import TaskForm from "./tasks/TaskForm";
import TaskList from "./tasks/TaskList";

const Home = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    dueDate: "",
  });
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    sort: "asc",
    page: 1,
    status: "",
    priority: "",
    fromDate: "",
    toDate: "",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const navigate = useNavigate();

  const handleFormChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loadTasks = useCallback(async (overrides = {}) => {
    try {
      setLoading(true);
      setError("");

      const queryParams = new URLSearchParams({
        page: overrides.page ?? filters.page,
        limit: 5,
        sort: filters.sort,
        ...(filters.search && { title: filters.search.trim() }),
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.fromDate && { from_Date: filters.fromDate }),
        ...(filters.toDate && { to_Date: filters.toDate }),
      });

      const data = await fetchTasks(Object.fromEntries(queryParams));
      setTasks(data.tasks || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, formValues);
        setSuccess("Task updated successfully!");
      } else {
        await createTask(formValues);
        setSuccess("Task added successfully!");
      }
      setFormValues({
        title: "",
        description: "",
        priority: "low",
        status: "pending",
        dueDate: "",
      });
      setEditingTaskId(null);
      await loadTasks({ page: filters.page });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setFormValues({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "low",
      status: task.status || "pending",
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
    setEditingTaskId(task._id);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setSuccess("Task deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black">task Manager</h1>
        <button
          onClick={handleLogout}
          className="border border-black bg-teal-950 px-4 py-1 text-white"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 p-4">
          <TaskForm
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            isEditing={Boolean(editingTaskId)}
            statusOptions={STATUS_OPTIONS}
            priorityOptions={PRIORITY_OPTIONS}
            submitting={loading}
          />
        </div>

        <div className="w-full md:w-2/3">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm mb-4">
              {success}
            </div>
          )}
          <TaskFilters
            filters={filters}
            onFilterChange={(field, value) =>
              setFilters((prev) => ({
                ...prev,
                [field]: field === "search" ? value.trimStart() : value,
                page: field === "page" ? value : 1,
              }))
            }
            statusOptions={STATUS_OPTIONS}
            priorityOptions={PRIORITY_OPTIONS}
          />
          {loading ? (
            <div className="bg-white border p-4 mb-3">
              <p>Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              isAdmin={userRole === "admin"}
              onEdit={handleEdit}
              onDelete={handleDelete}
              statusOptions={STATUS_OPTIONS}
              priorityOptions={PRIORITY_OPTIONS}
            />
          )}
          <Pagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={(nextPage) =>
              setFilters((prev) => ({ ...prev, page: nextPage }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

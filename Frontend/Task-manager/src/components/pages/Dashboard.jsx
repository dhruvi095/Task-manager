import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTask,
  updateTask,
  deleteTask,
  fetchTasks,
} from "../api/Tasks.jsx";
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
} from "../constants/TaskOptions.jsx";

import Pagination from "../tasks/Pagination.jsx";
import TaskList from "../tasks/TaskList.jsx";
import Header from "../tasks/Header.jsx";
import TaskFilters from "../tasks/TaskFilters.jsx";
import TaskForm from "../tasks/TaskForm.jsx";
import Modal from "../tasks/Modal.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    dueDate: "",
    file: null,
  });

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleFormChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchTasks({
        page: filters.page,
        limit: 5,
        sort: filters.sort,
        title: filters.search,
        status: filters.status,
        priority: filters.priority,
        from_Date: filters.fromDate,
        to_Date: filters.toDate,
      });

      setTasks(data.tasks || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

useEffect(() => {
  const debounceTimer = setTimeout(() => {
    setFilters(prev => ({ ...prev, search: searchInput, page: 1 }));
  }, 500); 

  return () => clearTimeout(debounceTimer); 
}, [searchInput]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const resetForm = () => {
    setFormValues({
      title: "",
      description: "",
      priority: "low",
      status: "pending",
      dueDate: "",
      file: null,
    });
    setEditingTaskId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (editingTaskId) {
        await updateTask(editingTaskId, formData);
        setSuccess("Task updated successfully!");
      } else {
        await createTask(formData);
        setSuccess("Task added successfully!");
      }

      resetForm();
      setIsModalOpen(false);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setFormValues({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate?.split("T")[0] || "",
      file: null,
    });
    setEditingTaskId(task._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onLogout={handleLogout}
        onAddTask={() => {
          resetForm();
          setIsModalOpen(true);
        }}
      />

      <div className="max-w-6xl mx-auto p-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <TaskFilters
  filters={{ ...filters, search: searchInput }}
  onFilterChange={(field, value) => {
    if (field === "search") {
      setSearchInput(value); // update search input state
    } else {
      setFilters(prev => ({ ...prev, [field]: value, page: 1 })); // other filters update immediately
    }
  }}
  statusOptions={STATUS_OPTIONS}
  priorityOptions={PRIORITY_OPTIONS}
/>


        {loading ? (
          <div className="bg-white p-4 border">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            isAdmin={userRole === "admin"}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <Pagination
          page={filters.page}
          totalPages={totalPages}
          onPageChange={(page) =>
            setFilters((prev) => ({ ...prev, page }))
          }
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTaskId ? "Edit Task" : "Add Task"}
      >
        <TaskForm
          values={formValues}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          isEditing={Boolean(editingTaskId)}
          statusOptions={STATUS_OPTIONS}
          priorityOptions={PRIORITY_OPTIONS}
          submitting={loading}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [userRole, setUserRole] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false);
  const [tasks, settasks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [editingtaskId, setEditingtaskId] = useState(null);
  
  const navigate = useNavigate();
  const handleinput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break

      case "description":
        setDescription(value);
        break

      case "priority":
        setPriority(value);
        break

      case "status":
        setStatus(value);
        break

      case "dueDate":
        setDueDate(value);
        break
    }

  }
    const handle = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = { title, description, priority, status, dueDate };

    try {
      const token = localStorage.getItem("token");
      const url = editingtaskId
        ? `http://localhost:5001/api/tasks/${editingtaskId}`
        : "http://localhost:5001/api/tasks";

      const method = editingtaskId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      const updatedTask = data.task || data;

      if (editingtaskId) {
        settasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingtaskId ? updatedTask : task
          )
        );
        setSuccess("Task updated successfully!");
      } else {
        settasks((prevTasks) => [...prevTasks, updatedTask]);
        setSuccess("Task added successfully!");
      }
      setTitle("");
      setDescription("");
      setPriority("Low");
      setStatus("Pending");
      setDueDate("");
      setEditingtaskId(null);
    } catch (err) {
      setError(err.message);
    }
  };
    const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setStatus(task.status);
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    setEditingtaskId(task._id);
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      const queryParams = new URLSearchParams({
        page,
        limit: 5,
        sort,
        ...(search && { title: search.trim() }),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
      });

      const res = await fetch(
        `http://localhost:5001/api/tasks?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      settasks(data.tasks || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, sort, page, statusFilter, priorityFilter]);

 const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to delete task");
        return;
      }
      settasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setSuccess("Task deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black">
          task Manager
        </h1>
        <button
          onClick={handleLogout}
          className="border border-black bg-teal-950 px-4 py-1 text-white"
        >
          Logout
        </button>
      </div>


      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">

        <div className="w-full md:w-1/3 p-4">
          <form className="bg-white border p-4" onSubmit={handle}>
            <h2 className="text-lg font-semibold mb-4">
              {editingtaskId ? "Edit Task" : "Add Task"}
            </h2>

            <input
              name="title"
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 mb-3"
              value={title || ""}
              onChange={handleinput}
            />

            <textarea
              name="description"
              placeholder="Description"
              className="w-full border px-3 py-2 mb-3"
              value={description || ""}
              onChange={handleinput}
            ></textarea>

            <div className="flex items-center mb-4 gap-3 ">
              <label className="text-2xl font-medium w-24">Priority</label>
              <select
                name="priority"
                className="flex-1 border px-3 py-2"
                value={priority || ""}
                onChange={handleinput}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="flex items-center mb-4 gap-3 ">
              <label className="text-2xl font-medium w-24">Status</label>
              <select
                name="status"
                className="flex-1 border px-3 py-2"
                value={status || ""}
                onChange={handleinput}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <input
              name="dueDate"
              type="date"
              className="w-full border px-3 py-2 mb-3"
              value={dueDate || ""}
              onChange={handleinput}
            />

            <button className="w-full border border-black bg-teal-950 px-3 py-1 text-white" type="submit">
              {editingtaskId ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-2/3">

          <div className="bg-white border p-3 mb-4 flex gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border px-3 py-2"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.trimStart());
                setPage(1);
              }}

            />
            <select
              className="border px-3 py-2"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              className="border px-3 py-2"
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select
              className="border bg-teal-950 px-3 py-1 text-white"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="asc">Due Date asc</option>
              <option value="desc">Due Date desc</option>
            </select>
          </div>






          <div className="bg-white border p-4 mb-3">
            {tasks.length === 0 ? (
              <p>No tasks found</p>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className="bg-white border p-4 mb-3">
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>

                  <p className="text-sm mt-2">
                    Priority: {task.priority} | Status: {task.status}
                  </p>
                  <p className="text-sm mt-2">
                    Due-Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                  </p>

                  {userRole === "admin" && (
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleEdit(task)}
                        className="border border-black bg-teal-950 px-3 py-1 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="border border-black bg-orange-600 px-3 py-1 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center gap-3 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="border px-3 py-1 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="border px-3 py-1">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="border px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div >
  );
};

export default Home;

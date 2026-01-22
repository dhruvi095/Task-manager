import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../component/Pagination.jsx";
import TaskList from "../component/TaskList.jsx";
import Header from "../component/Header.jsx";
import FiltersBar from "../filters/FiltersBar.jsx";
import TaskModels from "../component/TaskModels.jsx";

const Home = () => {
  const [state, setState] = useState({
  title: "",
  description: "",
  priority: "Low",
  status: "Pending",
  dueDate: "",
  file: null,
});


  const [userRole, setUserRole] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false);
  const [tasks, settasks] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [editingtaskId, setEditingtaskId] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [to_Date, setTo_Date] = useState("");
  const [showform, setShowform] = useState(false);
  const navigate = useNavigate();
  // const handleinput = (e) => {
  //   const { name, value, files } = e.target;
  //   switch (name) {
  //     case "title":
  //       setTitle(value);
  //       break

  //     case "description":
  //       setDescription(value);
  //       break

  //     case "priority":
  //       setPriority(value);
  //       break

  //     case "status":
  //       setStatus(value);
  //       break

  //     case "dueDate":
  //       setDueDate(value);
  //       break
  //     case "file":
  //       setFile(files[0]);
  //       break
  //   }

  // }
  const handleinput = (e) => {
  const { name, value, files, type } = e.target;

  setState(prev => ({
    ...prev,
    [name]: type === "file" ? files[0] : value,
  }));
};

 
  const handle = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("priority", state.priority);
    formData.append("status", state.status);
    formData.append("dueDate",state.dueDate);
    if (state.file) formData.append("file", state.file);

    try {
      const token = localStorage.getItem("token");
      const url = editingtaskId
        ? `http://localhost:5001/api/tasks/${editingtaskId}`
        : "http://localhost:5001/api/tasks";

      const response = await fetch(url, {
        method: editingtaskId ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess(editingtaskId ? "Task updated!" : "Task added!");
      fetchTasks();
      setShowform(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setShowform(true);
setState(task.state.title);
    setState(task.description);
    setState(task.priority);
  setState(task.status);
    setState(task.dueDate ? task.dueDate.split("T")[0] : "");
    setState(null)
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
        ...(debouncedSearch && { title: debouncedSearch.trim() }),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
        ...(fromDate && { from_Date: fromDate }),
        ...(to_Date && { to_Date: to_Date }),
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
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchTasks();
  }, [debouncedSearch, sort, page, statusFilter, priorityFilter, fromDate, to_Date, userRole]);

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

    <Header
  onAddTask={() => setShowform(true)}
  onLogout={handleLogout}
/>



      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row justify-center gap-6">

       <TaskModels
       title={state.title}
       handle={handle}
       showform={showform}
       Error={Error}
       description={state.description}
       priority={state.priority}
       status={state.status}
       handleinput={handleinput}
       editingtaskId={editingtaskId}
       dueDate={state.dueDate}
       />

        <div className="w-full md:w-2/3">

        <FiltersBar
  search={search}
  setSearch={setSearch}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  priorityFilter={priorityFilter}
  setPriorityFilter={setPriorityFilter}
  sort={sort}
  setSort={setSort}
  fromDate={fromDate}
  toDate={to_Date}
  setFromDate={setFromDate}
  setToDate={setTo_Date}
  setPage={setPage}
/>


          <TaskList
  task={tasks}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
  userRole={userRole}
/>



          <div className="flex justify-center gap-3 mt-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            


          </div>

        </div>
      </div>
      
    </div >
  );
};

export default Home;

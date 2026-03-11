const Header = ({ onLogout, onAddTask }) => {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>

      <div className="flex gap-3">
        <button
          onClick={onAddTask}
          className="bg-teal-950 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>

        <button
          onClick={onLogout}
          className="border px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;

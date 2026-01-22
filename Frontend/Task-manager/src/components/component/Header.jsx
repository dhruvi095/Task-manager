const Header = ({ onAddTask, onLogout }) => {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-black">
        Task Manager
      </h1>

      <div className="flex gap-3">
        <button
          onClick={onAddTask}
          className="border border-black bg-teal-950 px-4 py-1 text-white"
        >
          Add Task
        </button>

        <button
          onClick={onLogout}
          className="border border-black bg-teal-950 px-4 py-1 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;

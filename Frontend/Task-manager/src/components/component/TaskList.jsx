import Dis from "./Discription";

const TaskList = ({ task, handleEdit, handleDelete, userRole }) => {
  return (
      <div className="bg-white border p-4 mb-3">
            {task.length === 0 ? (
              <p>No tasks found</p>
            ) : (
              task.map((task) => (
                <div key={task._id} className="bg-white border p-4 mb-3">
                  <h3 className="font-black"><b>{task.title}</b></h3>
                  <div className="text-sm mt-2 ">
                    <b>Description : </b>
                  <Dis text={task.description}/>
                  </div>

                  <p className="text-sm mt-2 ">
                    <b> Priority : </b>
                    {task.priority}
                  </p>
                  <p className="text-sm mt-2">
                    <b>Status : </b>
                    {task.status}
                  </p>

                  <p className="text-sm mt-2">
                    <b>Due-Date:</b>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>



                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleEdit(task)}
                      className="border border-black bg-teal-950 px-3 py-1 text-white"
                    >
                      Edit
                    </button>


                  </div>
                  {task.file && (
                    <a
                      href={`http://localhost:5001/uploads/${task.file.replaceAll("\\", "/")}`}

                      target="_blank"
                      rel=" "
                      className="inline-block mt-2 border border-black bg-teal-950 px-3 py-1 text-white"
                    >
                      View docs
                    </a>
                  )}


                  {userRole === "admin" && (
                    <div className="flex gap-3 mt-3">
                      <p className="text-sm mt-2">
                        <b>Added_by</b>
                        {task['user']?.name}
                      </p>
                      <p className="text-sm mt-2">
                        <b>Added_by</b>
                        {task['user']?.role}
                      </p>
                      <button

                        onClick={() => {
                          if (confirm("Are you sure you want to delete this task?")) {
                            handleDelete(task._id);
                          }
                        }}
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
  );
};

export default TaskList;

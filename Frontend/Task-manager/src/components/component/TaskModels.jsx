const TaskModels = ({
  title,handle,showform,Error,description,priority,status,handleinput,editingtaskId,dueDate
})=>{
  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row justify-center gap-6">
     {showform && (
          <div className="w-full md:w-2/ p-4">
            <form className="bg-white border p-4" onSubmit={handle} >
              <h2 className="text-lg font-semibold mb-4">
                {editingtaskId ? "Edit Task" : "Add Task"}
              </h2>
              <div className="mb-2 text-red-600">{Error}</div>

              <input
                name="title"
                type="text"
                placeholder="Title"
                className="w-full border px-3 py-2 mb-3"
                value={title}
                onChange={handleinput}
              />

              <textarea
                name="description"
                placeholder="Description"
                className="w-full border px-3 py-2 mb-3"
                value={description}
                onChange={handleinput}
              ></textarea>

              <div className="flex items-center mb-4 gap-3 ">
                <label className="text-2xl font-medium w-24">Priority</label>
                <select
                  name="priority"
                  className="flex-1 border px-3 py-2"
                  value={priority}
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
                  value={status}
                  onChange={handleinput}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <input
                type="date"
                name="dueDate"
                className="w-full border px-3 py-2 mb-3"
                min={editingtaskId ? undefined : new Date().toISOString().split("T")[0]}
                value={dueDate}
                onChange={handleinput}
              />

              <input
                type="file"
                name="file"
                className="w-full border px-3 py-2 mb-3"
                onChange={handleinput}
              />


              <button className="w-full border border-black bg-teal-950 px-3 py-1 text-white" type="submit">
                {editingtaskId ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        )}
        </div>
  )
}
export default TaskModels
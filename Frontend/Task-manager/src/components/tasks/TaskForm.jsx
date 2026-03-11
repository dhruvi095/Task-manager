import FormRow from "./FormRow";

const TaskForm = ({
  values,
  onChange,
  onSubmit,
  isEditing = false,
  statusOptions = [],
  priorityOptions = [],
  submitting = false,
}) => {
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    onChange(name, type === "file" ? files[0] : value);
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Task" : "Add Task"}
      </h2>

      <table className="w-full border-collapse">
        <tbody>
          <FormRow label="Title">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </FormRow>

          <FormRow label="Description">
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded"
            />
          </FormRow>

          <FormRow label="Priority">
            <select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            >
              {priorityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="Status">
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="Due Date">
            <input
              type="date"
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
               min={!isEditing ? new Date().toISOString().split("T")[0] : undefined}
            />
          </FormRow>

          <FormRow label="Attachment">
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </FormRow>
        </tbody>
      </table>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 w-full bg-teal-950 text-white py-2 rounded disabled:opacity-60"
      >
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;

const API_URL = "http://localhost:5001/api/tasks";

const getToken = () => localStorage.getItem("token");


export const fetchTasks = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${API_URL}?${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await res.json();

 
        
if (!res.ok) {
  throw new Error(data.message || "Failed to fetch tasks");
}

return data;
};


export const createTask = async (formData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create task");
  }

  return data;
};


export const updateTask = async (taskId, formData) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update task");
  }

  return data;
};


export const deleteTask = async (taskId) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete task");
  }

  return data;
};

// export const addSubtask = async (taskId, subtaskData) => {
//   const res = await fetch(`${API_URL}/${taskId}/subtasks`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getToken()}`,
//     },
//     body: JSON.stringify(subtaskData),
//   });

//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(data.message || "Failed to add subtask");
//   }
//   return data;
// };

// // 2️⃣ GET SUBTASKS
// // GET /api/tasks/:taskId/subtasks
// export const fetchSubtasks = async (taskId) => {
//   const res = await fetch(`${API_URL}/${taskId}/subtasks`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });

//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(data.message || "Failed to fetch subtasks");
//   }
//   return data;
// };

// // 3️⃣ UPDATE SUBTASK
// // PUT /api/tasks/:taskId/subtasks/:subtaskId
// export const updateSubtask = async (taskId, subtaskId, subtaskData) => {
//   const res = await fetch(`${API_URL}/${taskId}/subtasks/${subtaskId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getToken()}`,
//     },
//     body: JSON.stringify(subtaskData),
//   });

//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(data.message || "Failed to update subtask");
//   }
//   return data;
// };

// // 4️⃣ DELETE SUBTASK
// // DELETE /api/tasks/:taskId/subtasks/:subtaskId
// export const deleteSubtask = async (taskId, subtaskId) => {
//   const res = await fetch(`${API_URL}/${taskId}/subtasks/${subtaskId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });

//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(data.message || "Failed to delete subtask");
//   }
//   return data;
// };
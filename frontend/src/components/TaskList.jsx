import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { generatePDF } from '../utils/pdf';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">Task List</h1>
      <button
        onClick={() => generatePDF(tasks)}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
      >
        Download PDF Report
      </button>
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{new Date(task.deadline).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

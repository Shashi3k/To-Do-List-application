import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";

const App = () =>{
  const [tasks, setTasks] = useState([
    {id: 1, text: "Tasks 1"},
    {id: 2, text: "Tasks 2"}
  ]);

  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    // Fetch tasks from the PHP API when the component mounts
    fetch('http://localhost/api.php')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      // Send a POST request to add a new task
      fetch('http://localhost/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTaskText }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the tasks in the state with the newly added task
          setTasks([...tasks, data]);
          setNewTaskText(''); // Clear the input field after adding the task
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  const handleDeleteTask = (taskId) => {
    // Send a DELETE request to delete the task with the given ID
    fetch(`http://localhost/api.php?id=${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                // If the delete request is successful, update the tasks in the state
                setTasks(tasks.filter((task) => task.id !== taskId));
            } else {
                // If there was an error, handle it accordingly
                console.error('Error deleting task:', response.statusText);
            }
        })
        .catch((error) => console.error('Error:', error));
};


  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskList tasks={tasks} onDelete={(taskId) => handleDeleteTask(taskId)} />
      <div className="task-form">
        <input 
          type="text"
          placeholder="Enter your task..."
          value={newTaskText}
          onChange={(e)=>setNewTaskText(e.target.value)}
        />
      <button onClick={() => handleAddTask}>Add Task</button>  
    </div>
    </div>
  );
};

export default App;
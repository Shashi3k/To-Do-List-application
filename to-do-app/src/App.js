import React, { useState } from "react";
import TaskList from "./TaskList";

const App = () =>{
  const [tasks, setTasks] = useState([
    {id: 1, text: "Tasks 1"},
    {id: 2, text: "Tasks 2"}
  ]);

  const [newTaskText, setNewTaskText] = useState('');

  const handleTaskAction = (taskId, actionType) =>{
    if (actionType === 'add'){

      if (newTaskText.trim() !== ""){
        const newTask ={
          id:tasks.length+1,
          text: newTaskText
        };
      setTasks([...tasks, newTask]);
      setNewTaskText('')
    }
  }
    else if(actionType === 'delete'){
      setTasks(tasks.filter((task)=> task.id !== taskId));
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskList tasks={tasks} onDelete={(taskId) => handleTaskAction(taskId, 'delete')} />
      <div className="task-form">
        <input 
          type="text"
          placeholder="Enter your task..."
          value={newTaskText}
          onChange={(e)=>setNewTaskText(e.target.value)}
        />
      <button onClick={() => handleTaskAction(null, 'add')}>Add Task</button>  
    </div>
    </div>
  );
};

export default App;
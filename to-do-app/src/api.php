<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "GET"){
    $tasks=[
        ['id'=>1, 'text'=>'Task 1'],
        ['id'=>2, 'text'=>'Task 2'],
    ];

    echo json_encode($tasks);
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents("php://input"), true);
    $newTaskText = $data['text']
    
    $newTaskId = count($tasks) + 1;
    $newTask = ['id' => $newTaskId, 'text'=> $newTaskText];
    $tasks[] = $newTask;

    echo json_encode($newTask);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    $taskId = $_GET['id'];

    foreach($tasks as $key => $task){
        if($task['id'] == $taskId){
            unset($tasks[$key]);
            echo json_encode($task);
            return;
        }
    }

    http_response_code(404);
    echo json_encode(['error' => 'Task not found']);
}

if($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $taskId = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);
    $updatedTaskText = $data['text'];

    foreach($tasks as &$task) {
        if ($task['id'] == $taskId){
            $task['text'] = $updatedTaskText;
            echo json_encode($task);
            return;
        }
    }

    http_response_code(404);
    echo json_encode(['error' => 'Task not found'])
}
const tasksRoutes = require("express").Router();
const tasksData = require("../tasks.json");
let tasks = JSON.parse(JSON.stringify(tasksData)).tasks;
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

tasksRoutes.use(bodyParser.urlencoded({ extended: false }));
tasksRoutes.use(bodyParser.json());

let writePath = path.join(__dirname, "..", "/tasks.json");

tasksRoutes.get("/", (req, res) => {
  let isCompleted = req.query.isCompleted;
  let sortDate = req.query.sortDate;
  let filteredTasks = tasks;

  if (isCompleted === "true" || isCompleted === "false") {
    filteredTasks = filteredTasks.filter(
      (Task) => Task.completed === isCompleted
    );
  }
  if (sortDate === "desc") {
    filteredTasks = filteredTasks.sort(
      (task1, task2) => Number(new Date(task2.updated)) - Number(new Date(task1.updated))
    );
  } else if (sortDate === "aesc") {
    filteredTasks = filteredTasks.sort(
      (task1, task2) => Number(new Date(task1.updated)) - Number(new Date(task2.updated))
    );
  }

  res.status(200);
  res.send(filteredTasks);
});

tasksRoutes.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let task = tasks.find((task) => task.id === id);

  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404).send("there's no task with id " + id);
  }
});

tasksRoutes.post("/", (req, res) => {
  let newTasks = req.body;

  if (Object.keys(newTasks).length > 0) {
    let maxId = tasks.reduce((maxVal, task) => {
      return (maxVal = maxVal > task.id ? maxVal : task.id);
    }, 0);

    let currentDateTime = new Date().toDateString();

    let task = newTasks.task;
    let taskPriority = newTasks.priority;

    if (task.length == 0) {
      res.status(500).send({
        status: "false",
        message: "Empty task send. please add task description",
      });
    }

    if (tasks.find((oldTask) => oldTask.task === task)) {
      res.status(403).send({
        status: "false",
        message: "Task already exists with task description as " + task,
      });
    } else {
      maxId = maxId + 1;
      let newTask = {
        id: maxId,
        task: task,
        priority: taskPriority,
        completed: "false",
        created: currentDateTime,
        updated: currentDateTime,
      };
      tasks.push(newTask);

      fs.writeFileSync(writePath, JSON.stringify({ tasks: tasks }), {
        encoding: "utf8",
        flag: "w",
      });

      res.status(200).send({
        success: true,
        message: "task successfully created",
        tasks: tasks,
      });
    }
  } 
  else {
    res.status(500).send({
      status: "false",
      message: "Empty task send. please add task description and priority.",
    });
  }
});

tasksRoutes.put("/:id", (req, res) => {
  let updatedTask = req.body;
  let id = parseInt(req.params.id);

  let taskIndex = tasks.findIndex((oldTask) => oldTask.id == id);

  let currentDateTime = new Date().toDateString();

  if (taskIndex > 0) {
    let isAnyTaskUpdated = false;

    if (updatedTask.task) {
      tasks[taskIndex].task = updatedTask.task;
      isAnyTaskUpdated = true;
    }

    if (updatedTask.completed) {
      tasks[taskIndex].completed = updatedTask.completed;
      isAnyTaskUpdated = true;
    }

    if (updatedTask.priority) {
      tasks[taskIndex].priority = updatedTask.priority;
      isAnyTaskUpdated = true;
    }

    tasks[taskIndex].updated = currentDateTime;

    if (isAnyTaskUpdated) {
      fs.writeFileSync(writePath, JSON.stringify({ tasks: tasks }), {
        encoding: "utf8",
        flag: "w",
      });
      res.status(200).send(tasks[taskIndex]);
    } else {
      res.status(500).send("No info in body for updating task " + updatedTask);
    }
  } else {
    res.status(404).send("there's no task with id " + id);
  }
});

tasksRoutes.delete("/:id", (req, res) => {
  // do something with id
  let id = parseInt(req.params.id);

  let taskIndex = tasks.findIndex((oldTask) => oldTask.id == id);

  // delete task
  if (taskIndex > 0) {
    let task = tasks[taskIndex];

    tasks.splice(taskIndex, 1);

    fs.writeFileSync(writePath, JSON.stringify({ tasks: tasks }), {
      encoding: "utf8",
      flag: "w",
    });

    res.status(200).send(task);
  } else {
    res.status(404).send("there's no task with id " + id);
  }
});

module.exports = tasksRoutes;

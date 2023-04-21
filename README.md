# Task-manager
A simple task manager backend implemented in node JS.

## Install

    npm install

## Run the app

    node app.js
# REST API

The REST API to the example app is described below.

## Get list of tasks

### Request

`GET /tasks/`

    curl -i -H 'Accept: application/json' http://localhost:7000/tasks/

### Response

    [
        {
            "id": 1,
            "task": "Help teacher in chores",
            "priority": "high",
            "completed": "false",
            "created": "Fri Apr 21 2023",
            "updated": "Fri Apr 21 2023"
        },
        {
            "id": 2,
            "task": "Help dad in chores",
            "priority": "medium",
            "completed": "false",
            "created": "Fri Apr 21 2023",
            "updated": "Fri Apr 21 2023"
        },
        {
            "id": 3,
            "task": "Help mom in chores",
            "priority": "low",
            "completed": "false",
            "created": "Fri Apr 21 2023",
            "updated": "Fri Apr 21 2023"
        }
    ]

### Request

`GET /tasks?isCompleted={true or false}&sortDate={asec or desc}`

    curl -i -H 'Accept: application/json' http://localhost:7000/tasks?isCompleted=false&sortDate=desc

### Response

    [
    {
        "id": 3,
        "task": "Help mom in chores",
        "priority": "low",
        "completed": "false",
        "created": "Fri Apr 21 2023",
        "updated": "Fri Apr 24 2023"
    },
    {
        "id": 2,
        "task": "Help dad in chores",
        "priority": "medium",
        "completed": "false",
        "created": "Fri Apr 21 2023",
        "updated": "Fri Apr 23 2023"
    },
    {
        "id": 1,
        "task": "Help teacher in chores",
        "priority": "high",
        "completed": "false",
        "created": "Fri Apr 21 2023",
        "updated": "Fri Apr 22 2023"
    }
    ]

## Get list of tasks based on priority

### Request

`GET /tasks/priority/:priority`

    curl -i -H 'Accept: application/json' http://localhost:7000/tasks/priority/low

### Response

    [
    {
        "id": 3,
        "task": "Help mom in chores",
        "priority": "low",
        "completed": "false",
        "created": "Fri Apr 21 2023",
        "updated": "Fri Apr 24 2023"
    }
    ]

## Get filter a task with ID

### Request

`GET /tasks/:id`

    curl -i -H 'Accept: application/json' http://localhost:7000/tasks/4

### Response

    {
    "id": 3,
    "task": "Help mom in chores",
    "priority": "low",
    "completed": "false",
    "created": "Fri Apr 21 2023",
    "updated": "Fri Apr 24 2023"
    }

## create a task

### Request

`POST /tasks/`

    curl -i -H 'Accept: application/json' http://localhost:7000/tasks/

    Body: {
        "task": "String",
        "priority": "String" // low,medium,high
    }

    Example Body: {
    "task": "Help mom in chores",
    "priority": "low"
    }

### Response

    {
    "success": true,
    "message": "task successfully created",
    "tasks": [
        {
            "id": 1,
            "task": "Help teacher in chores",
            "priority": "high",
            "completed": "false",
            "created": "Fri Apr 21 2023",
            "updated": "Fri Apr 22 2023"
        },
        {
            "id": 2,
            "task": "Help dad in chores",
            "priority": "medium",
            "completed": "false",
            "created": "Fri Apr 21 2023",
            "updated": "Fri Apr 23 2023"
        },
        {
            "id": 3,
            "task": "Help mom in chores",
            "priority": "low",
            "completed": "false",
            "created": "Fri Apr 21 2023",
            "updated": "Fri Apr 24 2023"
        },
        {
            "id": 4,
            "task": "Help uncle in chores",
            "priority": "low",
            "completed": "false",
            "created": "Fri Apr 21 2023",
            "updated": "Fri Apr 21 2023"
        }
    ]
    }

## Update task status description and priority

### Request

`PUT /tasks/:id`

    curl -i -H 'Accept: application/json' http://localhost:7000/tasks/4

    body: {
        "task": "String",
        "priority": "String", // low,medium,high
        "completed": "String" // true or false
    }

    example body: {
    "task": "Help uncle in chores",
    "priority": "low",
    "completed": "true"
    }

### Response

    {
    "id": 4,
    "task": "Help uncle in chores",
    "priority": "low",
    "completed": "true",
    "created": "Fri Apr 21 2023",
    "updated": "Fri Apr 21 2023"
    }

## delete task

### Request

`DELETE /tasks/:id`

    curl -i -H 'Accept: application/json' http://localhost:7000/tasks/4

### Response

    {
    "id": 4,
    "task": "Help uncle in chores",
    "priority": "low",
    "completed": "true",
    "created": "Fri Apr 21 2023",
    "updated": "Fri Apr 21 2023"
    }
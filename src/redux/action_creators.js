export function addTask(taskListID, taskString) {
    return {
        type: 'ADD_TASK',
        taskListID,
        taskString,
    }
}

export function addList(listNameString, id) {
    return {
        type: 'ADD_LIST',
        listNameString,
        id,
    }
}

export function setCurrentListID(taskListId) {
    return {
        type: 'SET_CURRENT_LIST',
        taskListId,
    }
}

export function updateTaskSave(listId, taskId, taskString) {
    return {
        type: 'UPDATE_TASK_STRING',
        listId,
        taskId,
        taskString,
    }
}

export function updateTaskDelete(listId, taskId) {
    return {
        type: 'UPDATE_TASK_DELETE',
        listId,
        taskId,
    }
}

export function checkToggle(listId, taskId, checked) {
    return {
        type: 'TOGGLE_TASK_COMPLETED',
        listId,
        taskId,
        checked,
    }
}


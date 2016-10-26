/* @flow */
import {List, Map, Record, fromJS} from 'immutable' // eslint-disable-line no-unused-vars


export type Task = {
    id: string,
    label: string,
}

export const TaskRecord = Record({
    id: '',
    label: '',
})

export type TaskList = {
    id: string,
    name: string,
    tasks: List<Task>,
}

export const TaskListRecord = Record({
    id: '',
    name: '',
    tasks: new List(),
})

export type AppState = {
    catalog: List<TaskList>,
    currentListId: string,
}

export const AppStateRecord = Record({
    catalog: new List(),
    currentListId: "",
})

export const INITIAL_STATE = new AppStateRecord()

export function addList(state: List<TaskList>, listName: string, id: string): List<TaskList> {
    return state.push(new TaskListRecord({
        id: id,
        name: listName,
        tasks: new List(),
    }))
}

export function addToList(state: List<TaskList>, idOfList: string, taskLabel: string): List<TaskList> {
    console.log("Addtolist: ", state)
    debugger

    return state.update(
        // find index
        state.findIndex(taskList => taskList.id === idOfList),

        // update
        taskList =>
            taskList.update("tasks", list => list.push(new TaskRecord({
                id: id(),
                label: taskLabel,
            })))
    )
}

export function updateTaskSave(state: List<TaskList>, listId: string, taskId: string, taskString: string): List<TaskList> {
    console.log("UpdateTaskSave: ", state)
    console.log("IdOfList: ", listId)
    console.log("IdOfTask: ", taskId)
    debugger
    return state.update(
        // find the list
        state.findIndex(
            taskList => taskList.id === listId
        ),

        // find the task in that list
        taskList => {
            const taskIndex = taskList.tasks.findIndex(task => task.id === taskId)
            debugger
            return taskList.updateIn(
                ["tasks", taskIndex],
                task => task.set( "label", taskString))
        }
    )
}

function id() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4()
}

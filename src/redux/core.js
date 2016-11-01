/* @flow */
import {List, Map, Record, fromJS} from 'immutable' // eslint-disable-line no-unused-vars


export type Task = {
    id: string,
    label: string,
    completed: bool,
}

export const TaskRecord = Record({
    id: '',
    label: '',
    completed: false,
})

export type TaskList = {
    id: string,
    name: string,
    count: number,
    tasks: List<Task>,
}

export const TaskListRecord = Record({
    id: '',
    name: '',
    count: 0,
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

export function addList(state:List<TaskList>, listName:string, id:string):List<TaskList> {
    return state.push(new TaskListRecord({
        id: id,
        name: listName,
        tasks: new List(),
    }))
}


export function addToList(state:List<TaskList>, listId:string, taskLabel:string):List<TaskList> {
    console.log("Addtolist: ", state)

    const newState = state.update(
        state.findIndex(taskList => taskList.id === listId),
        taskList => {
            return taskList.set('count', taskList.get('count') + 1)
        }
    )

    return newState.update(
        // find index
        state.findIndex(taskList => taskList.id === listId),

        // update
        taskList =>
            taskList.update("tasks", list => list.push(new TaskRecord({
                id: id(),
                label: taskLabel,
            })))
    )
}


export function updateTaskSave(state:List<TaskList>, listId:string, taskId:string, taskString:string):List<TaskList> {
    console.log("UpdateTaskSave: ", state)
    console.log("IdOfList: ", listId)
    console.log("IdOfTask: ", taskId)

    return state.update(
        // find the list
        state.findIndex(
            taskList => taskList.id === listId
        ),

        // find the task in that list
        taskList => {
            const taskIndex = taskList.tasks.findIndex(task => task.id === taskId)

            return taskList.updateIn(
                ["tasks", taskIndex],
                task => task.set("label", taskString))
        }
    )
}


export function updateTaskDelete(state:List<TaskList>, listId:string, taskId:string):List<TaskList> {

    const newState = state.update(
        state.findIndex(taskList => taskList.id === listId),
        taskList => {
            return taskList.set('count', taskList.get('count') - 1)
        }
    )

    return newState.update(
        //find list
        state.findIndex(
            taskList => taskList.id === listId
        ),

        // find the task in that list
        taskList => {
            const taskIndex = taskList.tasks.findIndex(task => task.id === taskId)

            return taskList.deleteIn(
                ["tasks", taskIndex]
            )
        }
    ).set("count", state.get('count') - 1)
}


export function toggleChecked(state:List<TaskList>, listId:string, taskId:string, checked:bool):List<TaskList> {

    return state.update(
        // find the list
        state.findIndex(
            taskList => taskList.id === listId
        ),

        // find the task in that list
        taskList => {
            const taskIndex = taskList.tasks.findIndex(task => task.id === taskId)

            return taskList.updateIn(
                ["tasks", taskIndex],
                task => task.set("completed", checked))
        }
    )
}

export function updateListName(state:List<TaskList>, id:string, updatedListName:string):List<TaskList> {
    
    return state.update(
        state.findIndex(
            taskList => taskList.get('id') === id
        ),
        list => list.set("name", updatedListName)
    )
}

// delete list form side menu
export function deleteList(state: list<TaskList>, id:string): List<TaskList> {
    
    return state.delete(
        state.findIndex( taskList => taskList.id === id
        )
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

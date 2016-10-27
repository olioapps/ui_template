import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import Task from './task'


class TaskList extends Component {
    constructor(props) {
        super(props)

        this.setTask = this.setTask.bind(this)
        this.saveTask = this.saveTask.bind(this)
        this.clearTask = this.clearTask.bind(this)

        this.state = {
            taskName: '',
        }
    }

    setTask(event) {
        const text = event.target.value
        this.setState({taskName: text})
    }

    saveTask() {

        this.props.addTask(this.props.currentListId, this.state.taskName)
        this.clearTask()
    }

    clearTask() {
        this.setState({taskName: ''})
    }


    render() {
        const currentList = this.props.catalog.find((list) => list.id === this.props.currentListId) || {tasks: []}
        const listOfTasks = currentList.tasks.map((task, i) => <Task key={i} task={task}/>)
        return (
            <div id="taskList">

                <h3>{currentList.name}</h3>
                {listOfTasks}
                <div className="newTaskContainer">
                    <input id="task_input" type="text" placeholder="Enter new task" value={this.state.taskName}
                           onChange={this.setTask}></input>
                    <div className="btnContainer">
                        <button onClick={this.saveTask}><i className="fa fa-check" aria-hidden="true"></i></button>
                        <button onClick={this.clearTask}><i className="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(TaskList)
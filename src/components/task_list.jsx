import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import Task from './task'
import TaskInput from './task_input'

class TaskList extends Component {

    render() {

        const currentList = this.props.catalog.find((list) => list.id === this.props.currentListId) || {tasks: []}
        const listOfTasks = currentList.tasks.map((task, i) => {
            return <Task key={i} task={task}/>
        })

        return (
            <div id="taskList">

                {currentList.name ? <h3>{currentList.name}</h3> : null }

                {listOfTasks}

                {this.props.catalog.length !== 0
                    ? <TaskInput saveTask={this.saveTask} addTask={this.props.addTask}/>
                    : <h2>Please Create A List</h2>
                }

            </div>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(TaskList)

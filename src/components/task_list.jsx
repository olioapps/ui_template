import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import Task from './task'
import Validate from './validate'


class TaskList extends Component {
    constructor(props) {
        super(props)

        this.setTask = this.setTask.bind(this)
        this.saveTask = this.saveTask.bind(this)
        this.clearTask = this.clearTask.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.renderTaskInput = this.renderTaskInput.bind(this)

        this.state = {
            taskName: '',
            showHelp: false,
        }
    }

    setTask(event) {
        const text = event.target.value
        this.setState({taskName: text})
        this.setState({showHelp: false})
    }

    saveTask() {
        if (this.state.taskName !== '') {
            this.props.addTask(this.props.currentListId, this.state.taskName)
            this.clearTask()
        } else {
            this.setState({showHelp: true})
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.saveTask()
        }
    }

    clearTask() {
        this.setState({taskName: ''})
    }

    componentDidMount() {
        this.refs.taskInput ? ReactDOM.findDOMNode(this.refs.taskInput).focus() : null
    }

    renderTaskInput() {
        return (
            <div className="newTaskContainer">
                <input id="task_input"
                       ref="taskInput" type="text"
                       placeholder="Enter new task"
                       value={this.state.taskName}
                       onChange={this.setTask}
                       onKeyPress={this.handleKeyPress}/>
                <div className="btnContainer">
                    <button
                        onClick={this.saveTask}>
                        <i className="fa fa-check"/>
                    </button>
                    <button
                        onClick={this.clearTask}>
                        <i className="fa fa-times"/>
                    </button>
                </div>
            </div>
        )
    }

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
                    ? this.renderTaskInput()
                    : <h2>Please Create A List</h2>
                }
                { this.state.showHelp ? <Validate /> : null }

            </div>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(TaskList)
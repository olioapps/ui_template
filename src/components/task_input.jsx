import React, {Component} from 'react'
import {connect} from 'react-redux'
import Validate from './validate'
import * as actionCreators from '../redux/action_creators'

class TaskInput extends Component {
    constructor(props) {
        super(props)

        this.clearTask = this.clearTask.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.submitTask = this.submitTask.bind(this)
        this.setTask = this.setTask.bind(this)

        this.state = {
            showHelp: false,
            taskName: '',
        }
    }

    submitTask() {
        this.setState({showHelp: false})

        if (this.state.taskName !== '') {
            this.props.saveTask(this.props.currentListId, this.state.taskName)
            this.clearTask()
        } else {
            this.setState({showHelp: true})
        }
    }

    saveTask() {
        if (this.state.taskName !== '') {
            this.props.addTask(this.props.currentListId, this.state.taskName)
            this.clearTask()
        } else {
            this.setState({showHelp: true})
            this.refs.nameInput.placeholder = "Cannot be empty"
            this.refs.nameInput.style.borderColor = "#fbb040"
        }
    }

    setTask(event) {
        const text = event.target.value
        this.setState({taskName: text})
    }

    clearTask() {
        this.setState({taskName: ''})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.saveTask()
        }
    }

    componentDidMount() {
        console.log(this.refs)
        this.refs.nameInput.focus()
    }

    render() {
        return (
            <div className="newTaskContainer">
                <input id="task_input"
                       autoFocus
                       ref="nameInput"
                       key={this.props.currentListId}
                       type="text"
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
}

export default connect(state => state.toJSON(), actionCreators)(TaskInput)
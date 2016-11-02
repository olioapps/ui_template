import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import Task from './task'
import HelpText from './help_text'


class TaskList extends Component {
    constructor(props) {
        super(props)

        this.setTask = this.setTask.bind(this)
        this.saveTask = this.saveTask.bind(this)
        this.clearTask = this.clearTask.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        

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
        if(this.state.taskName !== '') {
            this.props.addTask(this.props.currentListId, this.state.taskName)
            this.clearTask()
        } else {
            this.setState({showHelp: true})
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter'){
            console.log("enter key pressed")
            this.saveTask()
        }
    }

    clearTask() {
        this.setState({taskName: ''})
    }

    render() {

        const currentList = this.props.catalog.find((list) => list.id === this.props.currentListId) || {tasks: []}
        
        const listOfTasks = currentList.tasks.map((task, i) => {
            return <Task key={i} task={task}  />
        })

        // const incompleteTasks = currentList.tasks.filter( task=> task.completed ===false).map((task, i) => <Task key={i} task={task}/>)
        // const completeTasks = currentList.tasks.filter( task=> task.completed ===true).map((task, i) => <Task key={i} task={task}/>)
  
        return (
            <div id="taskList">

                <h3>{currentList.name}</h3>

                {listOfTasks}
                {console.log(this.props.catalog)}

                    {this.props.catalog.length !== 0
                        ? <div className="newTaskContainer">
                            <input id="task_input" type="text" placeholder="Enter new task" value={this.state.taskName}
                                   onChange={this.setTask} onKeyPress={this.handleKeyPress}/>
                                <div className="btnContainer">
                                    <button onClick={this.saveTask}><i className="fa fa-check" /></button>
                                    <button onClick={this.clearTask}><i className="fa fa-times" /></button>
                                </div>
                            </div>
                        : <h2>Please Create A List</h2>
                    }
                { this.state.showHelp ? <HelpText /> : null }

            </div>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(TaskList)
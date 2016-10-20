import React, { Component } from 'react'
import { connect } from 'react-redux'
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

    setTask(event){
        const text = event.target.value
        this.setState({ taskName: text})
    }


    saveTask(){
        this.clearTask()
        this.props.addTask(this.state.taskName)
    }


    clearTask(){
        document.getElementById("task_input").value = ""
    }


    render() {
        return (
            <div>

                <h3>A List</h3>
                <Task />
                <Task />
                <br/>
                <h3>{this.state.taskName}</h3>
                <input id="task_input" type="text" onChange={this.setTask}></input>
                <button onClick={this.saveTask}>Save</button>
                <button onClick={this.clearTask}>Clear</button>

            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(TaskList)
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
        this.props.addTask(this.state.taskName)
        this.clearTask()
    }


    clearTask(){
        this.setState({ taskName: ''})
    }


    render() {


        return (
            <div>

                <h3>A List</h3>
                <Task />
                <Task />
                <br/>
                <h3>{this.state.taskName}</h3>
                <input id="task_input" type="text" value={this.state.taskName} onChange={this.setTask}></input>
                <button onClick={this.saveTask}>Save</button>
                <button onClick={this.clearTask}>Clear</button>
                <br/>


                <h3>Hey</h3>
                <h3>{this.props.tasks.items}</h3>



            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(TaskList)
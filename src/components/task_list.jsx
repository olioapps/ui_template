import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import Task from './task'



class TaskList extends Component {
    constructor(props) {
        super(props)

        this.setTask = this.setTask.bind(this)
        this.saveTask = this.saveTask.bind(this)

        this.state = {
            taskName: '',
        }
    }
    setTask(event){
        const text = event.target.value

        this.setState({ taskName: text})

    }
    saveTask(){
        this.props.saveTask(this.state.taskName)
    }

    render() {
        return (
            <div>

                <h3>A List</h3>
                <Task />
                <Task />
                <Task />
                <br/>
                <input type="text" onChange={this.taskName}></input>
                <button onClick={this.saveTask}>Save</button>
                <button>Clear</button>

            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(TaskList)
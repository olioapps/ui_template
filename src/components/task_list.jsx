import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import Task from './task'



class TaskList extends Component {


    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }
    

    render() {
        return (
            <div>

                <h3>A List</h3>
                <Task />
                <Task />
                <Task />
                <br/>
                <button>New Task Button</button>

            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(TaskList)
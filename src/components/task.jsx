import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'


class Task extends Component {

    render() {
        return (
            <div>

                <input type="checkbox"/>
                <span>{this.props.task} </span>
                <button> Edit </button>
                <button> Delete </button>

            </div>
        )
    }
}

export default Task

// export default connect( state => state.toJSON(), actionCreators )(Task)
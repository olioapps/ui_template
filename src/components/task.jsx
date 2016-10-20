import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'


class Task extends Component {

    render() {
        return (
            <div>

                <input type="checkbox"/>
                <span>Task </span>
                <button> Edit </button>
                <button> Delete </button>

            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(Task)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'

class SideMenuOptions extends Component {

    render() {
        return (
            <div className="btnContainer">
            
                <button onClick={this.props.toggleEdit}>Edit</button>
                <button onClick={this.props.addNew}>New List</button>
            </div>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(SideMenuOptions)
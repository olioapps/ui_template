import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'

class SideMenuOptions extends Component {

    constructor(props) {
        super(props)

        this.newListButton = this.newListButton.bind(this)

    }


    newListButton() {
        this.props.toggleAddMode()
        if (this.props.revealOptionsBool) { this.props.revealOptions() }
    }

    showEditButton() {
        return <button onClick={this.props.revealOptions}>Edit</button>
    }

    render() {
        return (
            <div className="btnContainer">
                {this.props.catalog.length ? this.showEditButton(): null }
                <button onClick={this.newListButton}>New List</button>
            </div>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(SideMenuOptions)
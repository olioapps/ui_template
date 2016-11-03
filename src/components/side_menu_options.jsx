import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'

class SideMenuOptions extends Component {

    constructor(props) {
        super(props)

        this.newListButton = this.newListButton.bind(this)
        this.showNewList = this.showNewList.bind(this)
    }


    newListButton() {
        this.props.toggleAddMode()
        if (this.props.revealOptionsBool) { this.props.revealOptions() }
    }

    showEditButton() {
        return <button onClick={this.props.revealOptions}>Edit</button>
    }

    showNewList() {

        return <button onClick={this.newListButton}>New List</button>
    }

    render() {
        return (
            <span className="btnContainer">
                {this.props.catalog.length && !this.props.addMode ? this.showEditButton(): null }
                {!this.props.addMode ? this.showNewList() : null}
            </span>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(SideMenuOptions)
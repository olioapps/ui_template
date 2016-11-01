import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'

class ListOptions extends Component {

    constructor(props) {
        super(props)

        this.editModeButtons = this.editModeButtons.bind(this)
        this.optionButtons = this.optionButtons.bind(this)
    }

 


    editModeButtons() {
        return (
            <div>
                <button onClick={this.props.saveEdit}><i className="fa fa-check"/></button>
                <button onClick={this.props.handleClear}><i className="fa fa-times"/></button>
            </div>
        )
    }
    
    optionButtons() {
        return (
            <div>
                <button onClick={this.props.setListEditMode}><i className="fa fa-pencil"/></button>
                <button onClick={this.props.deleteList}><i className="fa fa-times"/></button>
            </div>
        )
    }

    render() {
        return (
            <div className="btnContainer">
                { this.props.editMode
                    ? this.editModeButtons()
                    : this.optionButtons()
                }
            </div>
        )
    }

}

export default connect(state => state.toJSON(), actionCreators)(ListOptions)
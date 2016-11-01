import React, {Component} from 'react'
import {connect} from 'react-redux'

class HelpText extends Component {


    render() {
        return (
            <div id="helpText">
                * cannot be empty
            </div>
        )
    }
}

export default connect(state => state.toJSON())(HelpText)
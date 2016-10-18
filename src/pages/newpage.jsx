import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class NewPage extends Component {
    

    render() {
        return (
            <div>

                <div>Yay a new page</div>
                
            </div>
        )
    }
}

export default connect(
    state => state.toJSON(), actionCreators
)(NewPage)

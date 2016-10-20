import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class SideMenu extends Component {


    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }
    

    render() {
        return (
            <div>

                <h3>User</h3>
                <h6>My lists... </h6>

                <button> Edit </button>
                <button> New List </button>
            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(SideMenu)
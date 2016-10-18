import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class HelloWorld extends Component {
    

    render() {
        return (
            <div>

                <h2>{this.props.hello.greeting}</h2>
                <h3>{this.props.math.value}</h3>
                <button onClick= { this.props.addNumber } > ++ </button>
                
            </div>
        )
    }
}

export default connect(
    state => state.toJSON(), actionCreators
)(HelloWorld)

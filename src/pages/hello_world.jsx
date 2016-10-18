import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class HelloWorld extends Component {






    // addNumber(event) {
    //     this.setState( {number: this.state.number + 1})
    //
    // }

    render() {
        return (
            <div>

                <h2>{this.props.hello}</h2>
                <h3>{this.props.number}</h3>
                <button onClick= { this.props.addNumber } > ++ </button>
                
            </div>
        )
    }
}

export default connect(
    state => state.toJSON(), actionCreators
)(HelloWorld)

import React, { Component } from 'react'
import { connect } from 'react-redux'

class HelloWorld extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.hello}</h2>
            </div>
        )
    }
}

export default connect(
    state => state.toJSON()
)(HelloWorld)

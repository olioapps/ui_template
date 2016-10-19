import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class HelloWorld extends Component {
    constructor(props) {
        super(props)
        
        this.nextPage = this.nextPage.bind(this)

    }
    
    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }

    nextPage() {
        this.context.router.push('/newPage')
    }

    render() {
        return (
            <div>
                <h2>{this.props.hello.greeting}</h2>
                <span>{this.props.math.value}</span>
                <button onClick={this.props.addNumber} > ++ </button>
                <br/>
                <button onClick={this.nextPage}>Go to New Page</button>
            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(HelloWorld)
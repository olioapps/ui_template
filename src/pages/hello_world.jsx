import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class HelloWorld extends Component {
    constructor(props) {
        super(props)
        
        this.nextPage = this.nextPage.bind(this)

        this.state = {
            route: '',
        }
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
                <h2>{this.state.route}</h2>
                <h2>{this.props.hello.greeting}</h2>
                <h3>{this.props.math.value}</h3>
                <button onClick={this.props.addNumber} > ++ </button>
                <button onClick={this.nextPage}>Go to New Page</button>
            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(HelloWorld)

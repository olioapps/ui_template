import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'

class NewPage extends Component {
    constructor(props) {
        super(props)

        this.setGreeting = this.setGreeting.bind(this)
        this.backPage = this.backPage.bind(this) 
        this.saveGreeting = this.saveGreeting.bind(this)
        this.state = {
            // greeting: 'Hello Olio',
            greeting: props.hello.greeting,
        }
    }

    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }

    setGreeting(e) {
        this.setState({ greeting: e.target.value })
    }

    backPage() {
        this.context.router.goBack()
    }

    saveGreeting() {
        this.props.setGreeting(this.state.greeting)
    }

    render() {
        return (
            <div>
                <h3>Enterer New Greeting: </h3>

                <input type="text" value={this.state.greeting} onChange={this.setGreeting} />

                <button onClick={this.saveGreeting}>Save</button>
                <br/>
                <button onClick={this.backPage}>Go back</button>
            </div>
        )
    }
}

export default connect(
    state => state.toJSON(), actionCreators
)(NewPage)

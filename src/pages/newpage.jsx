import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class NewPage extends Component {
    constructor(props) {
        super(props);

        this.setGreeting = this.setGreeting.bind(this);

        this.state = {
            greeting: 'Hello Olio',
        }
    }

    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }

    setGreeting(e) {
        this.setState({ greeting: e.target.value })
    }


    render() {
        return (
            <div>

                <div>Yay a new page</div>
                <h4>{this.state.greeting}</h4>

                <h6>{this.props.hello.greeting}</h6>

                <h3>Enterer New Greeting: </h3>

                <input type="text" onChange={this.setGreeting} />

                <button onClick={() => this.context.router.goBack()}>Go back</button>

                <button onClick={() => this.props.setGreeting(this.state.greeting)}>Save</button>

            </div>
        )
    }
}

export default connect(
    state => state.toJSON(), actionCreators
)(NewPage)

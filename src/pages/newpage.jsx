import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class NewPage extends Component {
    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }

    render() {
        return (
            <div>
                <input type="text" onChange={e => this.props.setGreeting(e.target.value)} />

                <div>Yay a new page</div>
                <button onClick={() => this.context.router.goBack()}>Go back</button>
                <button onClick={() => this.context.router.push('/')}>Go to Hello</button>
            </div>
        )
    }
}

export default connect(
    state => state.toJSON(), actionCreators
)(NewPage)

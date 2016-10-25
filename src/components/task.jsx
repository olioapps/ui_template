import React, { Component } from 'react'


class Task extends Component {

    render() {
        return (
            <div>

                <input type="checkbox"/>
                <span>{this.props.task.label} </span>
                <button> Edit </button>
                <button> Delete </button>

            </div>
        )
    }
}

export default Task


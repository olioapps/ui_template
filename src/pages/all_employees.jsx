import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

// MyComponent is a "presentational" or apollo-unaware component,
// It could be a simple React class:
class MyComponent extends Component {
    constructor(props) {
        super(props)
        this.toggleEditInput = this.toggleEditInput.bind(this)
        this.renameEmployee = this.renameEmployee.bind(this)
        this.setText = this.setText.bind(this)
        this.state = {
            editInput: false,
            editInputId: null,
            text: '',
        }
    }

    toggleEditInput(id) {
        return () => {
            this.setState({editInput: !this.state.editInput})
            this.setState({editInputId: id})
        }
    }

    setText(e) {
        this.setState({text: e.nativeEvent.target.value})
    }

    renameEmployee(id) {
        return () => {
            this.props.renameEmployee({variables: {id: id, name: this.state.text}}).then(this.props.data.refetch)
            this.toggleEditInput(null)()
        }
    }

    renderNameInput(id) {
        return (
            <div>
                <input type="text" placeholder="Enter new name" onChange={(e) => this.setText(e)} />
                <button onClick={this.renameEmployee(id)}>save</button>
            </div>
        )
    }

    renderEmployee(employee, i) {
        const { editInput, editInputId } = this.state
        const employeeId = parseInt(atob(employee.node.id).split(':')[1], 10)
        return (
             <li key={i}>
                <div>
                    {employee.node.name}
                    {editInput && editInputId === i ? this.renderNameInput(employeeId) : <button onClick={this.toggleEditInput(i)}>edit</button>}
                </div>
            </li>
        )
    }

    render() {
        const allEmployees = this.props.data.allEmployees ? this.props.data.allEmployees.edges : []
        const employeesLoaded = allEmployees.length > 0
        return (
            <div>
                <ul>
                    {employeesLoaded && allEmployees.map((employee, i) => this.renderEmployee(employee, i))}
                </ul>
            </div>
        )
    }
}

// Initialize GraphQL queries or mutations with the `gql` tag
const allEmployees = gql`query {
    allEmployees {
        edges {
            node {
                id
                name
                department {
                    name
                }
            }
        }
    }
}`

const renameEmployeeMutation = gql`
    mutation updateEmployee($id: Int, $name: String!) {
        updateEmployee(id: $id, name: $name) { employee { name } }
    }
`

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
// export const MyComponentWithQuery = graphql(allEmployees)(MyComponent)

const withQueryAndMutations = graphql(renameEmployeeMutation, {name: 'renameEmployee'})(
    graphql(allEmployees)(MyComponent)
)


// const MyComponentLinked = connect(
//   state => state.toJSON(),
// )(MyComponentWithQuery)

const MyComponentLinked = connect(
  state => state.toJSON(),
)(withQueryAndMutations)

export default MyComponentLinked
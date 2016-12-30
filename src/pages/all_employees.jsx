import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

// MyComponent is a "presentational" or apollo-unaware component,
// It could be a simple React class:
class MyComponent extends Component {
    render() {
        const allEmployees = this.props.data.allEmployees ? this.props.data.allEmployees.edges : []
        const employeesLoaded = allEmployees.length > 0
        return (
            <div>
                <ul>
                    {employeesLoaded && allEmployees.map((employee, i) => <li key={i}>{employee.node.name}</li>)}
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

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
export const MyComponentWithQuery = graphql(allEmployees)(MyComponent)



const MyComponentLinked = connect(
  state => state.toJSON(),
)(MyComponentWithQuery)

export default MyComponentLinked
import gql from 'graphql-tag'

// Initialize GraphQL queries or mutations with the `gql` tag

// Queries describe API calls that fetch model information from the server.
// See mutations.js if you want to make changes.

export const allTodoLists = gql`query {
   allTodoLists {
        edges {
            node {
                id
                name
                todos {
                    edges {
                        node {
                            id
                            name
                            todoListId
                        }
                    }
                }
            }
        }
    }
}`
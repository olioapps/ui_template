import ApolloClient, { createNetworkInterface } from 'apollo-client'

const devUrl = 'http://localhost:5000/graphql'

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: devUrl,
    }),
    dataIdFromObject: o => o.id,
    reduxRootSelector: state => state.get('apollo'),
})

export default client
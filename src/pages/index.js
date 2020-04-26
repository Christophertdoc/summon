import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost"
import Data from "../components/Data"

function IndexPage() {

  const httpLink = new HttpLink({
    uri: "https://gatsby-summon.herokuapp.com/v1/graphql"
  })

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
        <Data />
    </ApolloProvider>
  )
}

export default IndexPage

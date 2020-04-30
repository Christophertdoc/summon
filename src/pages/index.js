import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost"
import Notes from "../components/Notes"


function IndexPage() {

  const httpLink = new HttpLink({
    uri: process.env.HEROKU_URL
  })

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <Notes />
    </ApolloProvider>
  )

}





export default IndexPage

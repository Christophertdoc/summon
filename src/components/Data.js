import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { withApollo } from "@apollo/react-hoc"

export const USERS = gql`
  {  
    users {
      id 
      name
    }
  }  
`

function Data() {

    const { loading, error, data } = useQuery(USERS)

    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

    return (
        <div>
            {data.users.map(user => (
                <h2 key={user.id}>{user.name}</h2>
            ))}
        </div>
    )
}

export default withApollo(Data)
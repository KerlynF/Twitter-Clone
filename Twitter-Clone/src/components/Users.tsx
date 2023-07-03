import React from "react";
import {gql, useQuery} from "@apollo/client";

const USERS_QUERY = gql`
query USERS_QUERY {
    users {
        id
        name
        email
    }
}`

interface User {
    name: string,
    id: number,
    email: string
}

const Users = () => {
    const {data, loading, error} = useQuery(USERS_QUERY)
    console.log(error)
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>
    return (
        <div>
            {data.users.map((user: User) => (
                <>
                    <div>{user.id}</div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                </>
            ))}
        </div>
    )
}

export default Users;
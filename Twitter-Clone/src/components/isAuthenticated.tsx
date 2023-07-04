import {gql, useQuery} from "@apollo/client";
import React from "react";
import { redirect } from "react-router-dom";

const IS_LOGGED_IN = gql`
{
    me {
        id
    }
}
`

interface IsAuthenticatedI {
    children?: React.ReactNode
}
// ARREGLAR EL REDIRECT HACIA EL LANDING PAGE
const IsAuthenticated = ({children}: IsAuthenticatedI) => {
    const {data, loading, error} = useQuery(IS_LOGGED_IN)
    console.log(error)
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>
    if(!data.me){
        return <>{redirect('/login')}</>
    }
    return (
        <>
            {children}
        </>
    );
}

export default IsAuthenticated;
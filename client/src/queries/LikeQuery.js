import { gql } from 'apollo-boost';

export const ADD_LIKE = gql`
    mutation($id: ID!, $token: String!) {
        addLike(id: $id, token: $token) {
            err
            msg
        }
    }
`

export const REMOVE_LIKE = gql`
    mutation($id: ID!, $token: String!) {
        removeLike(id: $id, token: $token){
            err
            msg
        }
    }
`
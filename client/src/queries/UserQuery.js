import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
    mutation($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            err
            msg
            token
        }
    }
`

export const REGISTER_USER = gql`
    mutation($input: User!) {
        registerUser(input: $input) {
            err
            msg
        }
    }
`
import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
    {
        getPosts{
            id
            userName
            createdAt
            text
            likeCount
            commentCount
        }
    }
`

export const GET_POSTINFO = gql`
    query($id : ID!){
        getPostInfo(id: $id){
            userName
            createdAt
            text
            likes{
                userName
            }
            comments{
                userName
                text
                createdAt
            }
        }
    }
`

export const CREATE_POST = gql`
    mutation($token: String!, $text: String!) {
        createPost(token: $token, text: $text) {
            err
            msg
        }
    }
`

export const DELETE_POST = gql`
    mutation($token: String!, $id: ID!) {
        deletePost(token: $token, id: $id) {
            err
            msg
        }
    }
`

export const UPDATE_POST = gql`
    mutation($token: String!, $id: ID!, $text: String!) {
        updatePost(token: $token, id: $id, text: $text) {
            err
            msg
        }
    }
`
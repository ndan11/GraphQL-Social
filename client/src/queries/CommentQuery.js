import { gql } from 'apollo-boost';

export const ADD_COMMENT = gql`
    mutation($id: ID!, $token: String!, $text: String!) {
        createComment(id: $id, token: $token, text: $text) {
            err
            msg
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation($token: String!, $post_id: ID!, $comment_id: ID!) {
        deleteComment(token: $token, post_id: $post_id, comment_id: $comment_id) {
            err
            msg
        }
    }
`
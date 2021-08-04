const {PostsResolver} = require('./PostsResolver.js')
const {dateScalar} = require('../scalars/Date.js')
const {CommentsResolver} = require('./CommentsResolver.js')
const {LikesResolver} = require('./LikesResolver.js')
const {UserResolver} = require('./UserResolver.js')

const resolvers = {
    Query : {
        getPosts : PostsResolver.getPosts,
        getPostInfo : PostsResolver.getPostInfo
    },
    Mutation : {
        registerUser : UserResolver.registerUser,
        loginUser : UserResolver.loginUser,
        createPost : PostsResolver.createPost,
        deletePost : PostsResolver.deletePost,
        updatePost : PostsResolver.updatePost,
        createComment : CommentsResolver.createComment,
        deleteComment : CommentsResolver.deleteComment,
        addLike : LikesResolver.addLike,
        removeLike : LikesResolver.removeLike
    },
    Date : dateScalar
}

module.exports = {resolvers}
const Post = require('../models/Post.js')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwtConfig')

module.exports = {

    PostsResolver : {

        getPosts: async () => {
            return Post.find({})
            .then((posts) => {
                return posts.map((post) => ({
                    id : post._id,
                    userName: post.userName,
                    text: post.text,
                    createdAt: post.createdAt,
                    comments: post.comments,
                    likes: post.likes,
                    likeCount : post.likesCount,
                    commentCount : post.commentsCount
                }))
            })
        },

        getPostInfo: async (parent,args) => {
            return Post.findOne({_id : args.id})
            .then(async (post) => {
                return ({
                    id : post._id,
                    userName: post.userName,
                    text: post.text,
                    createdAt: post.createdAt,
                    comments: post.comments,
                    likes: post.likes,
                    likeCount : post.likesCount,
                    commentCount : post.commentsCount
                })
            })
        },
        
        createPost: async (parent,args) => {
            try{
                const {id} = jwt.verify(args.token,jwtSecret.secret)
                return User.findOne({user : id})
                    .then(async (user) => {
                        if(!user){
                            return ({
                                err : true,
                                msg : "Unauthenticated User"
                            })
                        }
                        let post = new Post({
                            userName: user.user,
                            text: args.text
                        })
                        await post.save()
                        return ({
                            err : false,
                            msg : "Post Created Successfully"
                        })
                    })
            }catch(error){
                return ({
                    err : true,
                    msg : "Cound not create the post."
                })
            }
        },

        deletePost: async (parent,args) => {
            try{
                const {id} = jwt.verify(args.token,jwtSecret.secret)
                return User.findOne({user : id})
                    .then(async (user) => {
                        if(!user){
                            return ({
                                err : true,
                                msg : "Unauthenticated User"
                            })
                        }
                        return Post.findOne({ $and : [{_id : args.id},{userName : user.user}]})
                        .then(async (post) => {
                            console.log(post)
                            await post.deleteOne()
                            return ({
                                err : false,
                                msg : "Post Deleted Successfully"
                            })
                        })
                    })
            }catch(error){
                return ({
                    err : true,
                    msg : "Cound not delete the post."
                })
            }
        },

        updatePost: async (parent,args) => {
            try{
                const {id} = jwt.verify(args.token,jwtSecret.secret)
                return User.findOne({user : id})
                    .then(async (user) => {
                        if(!user){
                            return ({
                                err : true,
                                msg : "Unauthenticated User"
                            })
                        }
                        return Post.findOne({ $and : [{_id : args.id},{userName : user.user}]})
                        .then(async (post) => {
                            post.text = args.text
                            await post.save()
                            return ({
                                err : false,
                                msg : "Post Updated Successfully"
                            })
                        })
                    })
            }catch(error){
                return ({
                    err : true,
                    msg : "Cound not update the post."
                })
            }
        },
    }   
}
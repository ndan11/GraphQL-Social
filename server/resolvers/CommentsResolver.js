const Post = require('../models/Post.js')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwtConfig')

module.exports = {

    CommentsResolver : {

        createComment: async(parent,args) => {
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
                        return Post.findOne({_id : args.id})
                        .then(async (post) => {
                            post.addComment({
                                userName : user.user,
                                text: args.text
                            })
                            await post.save()
                            return ({
                                err : false,
                                msg : "Comment Added Successfully."
                            })
                        })
                    })
            }catch(error){
                return ({
                    err : true,
                    msg : error
                })
            }
        },

        deleteComment : async(parent,args) => {
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
                        return Post.findOne({_id : args.post_id})
                        .then(async (post) => {
                            post.deleteComment(args.comment_id,user.user)
                            await post.save()
                            return ({
                                err : false,
                                msg : "Comment Deleted Successfully."
                            })
                        })
                    })
            }catch(error){
                return ({
                    err : true,
                    msg : error
                })
            }
        }
    }
}
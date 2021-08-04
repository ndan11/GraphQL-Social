const Post = require('../models/Post.js')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwtConfig')

module.exports = {

    LikesResolver : {

        addLike: async(parent,args) => {
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
                                post.addLike({
                                    userName : user.user
                                })
                                await post.save()
                                return ({
                                    err : false,
                                    msg : "Like Added Successfully."
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

        removeLike: async(parent,args) => {
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
                            post.deleteLike(user.user)
                            await post.save()
                            return ({
                                err : false,
                                msg : "Like Removed Successfully."
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

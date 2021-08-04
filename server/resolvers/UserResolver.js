const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwtConfig')
const getError = require('../helpers/dbErrorHandler.js')

module.exports = {

    UserResolver : {

        registerUser : async (parent,args) => {
            try{
                const user = new User({
                    name : `${args.input.fname} ${args.input.lname}`,
                    user : args.input.userName,
                    email : args.input.email,
                    password : args.input.password
                })
                await user.save()
                return {
                    err : false,
                    msg : 'User Registered'
                }
            }
            catch(error){
                return {
                    err: true,
                    msg: getError(error)
                }
            }
        },

        loginUser : async(parent,args) => {
            try{
                return User.findOne({ $or : [{email : args.email},{user: args.email}]})
                .then(async (user) => {
                    if(user){
                        if(!user.authenticate(args.password)){
                            return {
                                err: true,
                                msg: "Password doesnt not match."
                            }
                        }else{
                            const token = jwt.sign({id : user.user},jwtSecret.secret)
                            return {
                                err: false,
                                token,
                                msg: "Successfully signed in."
                            }
                        }
                    }else{
                        return {
                            err: true,
                            msg: "Email or username doesnt exist."
                        } 
                    }
                })
            }
            catch(error){
                console.log(error)
                return {
                    err: true,
                    msg: getError(error)
                }
            }
        }
    }
}

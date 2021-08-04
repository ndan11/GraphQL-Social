const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: true
    },
    text : {
        type: String,
        required: true
    },
    likes:[
        {
            userName: String,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    comments:[
        {
            userName: String,
            text: String,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    createdAt :{
        type: Date,
        default: Date.now()
    }
})

PostSchema.virtual('likesCount')
.get(function(){
    return this.likes.length
})

PostSchema.virtual('commentsCount')
.get(function(){
    return this.comments.length
})

PostSchema.methods = {
    addLike: function(like){
        this.likes.push({...like, createdAt : Date.now()})
    },
    deleteLike: function(userName){
        this.likes = this.likes.filter((e) => e.userName != userName)
    },
    addComment: function(comment){
        this.comments.push({...comment, createdAt : Date.now()})
    },
    deleteComment: function(id,userName){
        this.comments = this.comments.filter((e) => (e._id != id || e.userName != userName))
    }
}

module.exports = mongoose.model('Post',PostSchema)
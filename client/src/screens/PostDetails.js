import { useQuery, useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { DELETE_POST, GET_POSTINFO } from '../queries/PostQuery'
import { ADD_COMMENT } from '../queries/CommentQuery'
import { ADD_LIKE, REMOVE_LIKE } from '../queries/LikeQuery'
import { Comment } from '../components/Comment'
import { calculateTime } from '../utils/calcTime'
import { getLikesList } from '../utils/getLikesList'
import { useParams, useHistory} from 'react-router-dom'
import send from '../assets/send.png'
import like from '../assets/like.png'
import '../style/styles.css'
import { AuthContext } from '../context/auth'

export const PostDetails = () => {

    const { id } = useParams()
    const history = useHistory()
    const { user } = useContext(AuthContext)
    const [post,setPost] = useState(null)
    const [liked,setLiked] = useState(false)
    const [comment,setComment] = useState("")

    const {loading, error} = useQuery(GET_POSTINFO, {
        onCompleted({getPostInfo}){
            setPost(getPostInfo)
            if(getPostInfo.likes.length != 0 && ((e) => e.userName == user.userName)){
                setLiked(true)
            }
        },
        variables : {
            id 
        },
        pollInterval: 500,
    })

    const [deletePost] = useMutation(DELETE_POST,{
        onCompleted({deletePost}){
            let {err, msg} = deletePost
            alert(msg)
            if(!err){
                history.push('/')
            }
        },
        onError(error){
            console.log("An Error Occured.")
        }
    });

    const [submitComment] = useMutation(ADD_COMMENT,{
        onCompleted({createComment}){
            let {err, msg} = createComment
            alert(msg)
            if(!err){
                setPost({
                    ...post, 
                    comments: [...post.comments,{
                        id,
                        userName : user.userName,
                        text : comment
                    }]
                })
            }
            setComment('')
        },
        onError(error){
            console.log("An Error Occured.")
        }
    });

    const [addLike] = useMutation(ADD_LIKE,{
        onCompleted({addLike}){
            let {err, msg} = addLike
            alert(msg)
            if(!err){
                // setPost({
                //     ...post, 
                //     likes: [...post.likes,{
                //         id,
                //         userName : user.userName
                //     }]
                // })
                setLiked(true)
            }
        },
        onError(error){
            console.log("An Error Occured.")
        }
    });

    const [removeLike] = useMutation(REMOVE_LIKE,{
        onCompleted({removeLike}){
            let {err, msg} = removeLike
            alert(msg)
            if(!err){
                setPost({
                    ...post, 
                    likes: [...post.likes.filter(e => e.userName != user.userName)]
                })
                setLiked(false)
            }
        },
        onError(error){
            console.log("An Error Occured.")
        }
    });


    if(loading || post == null) return <div>Loading</div>
    if(error) return <div>Error</div>

    return(
        <div className='login-wrap'>
        <div className='post'>
            {user && user.userName == post.userName?
            <div> 
                <button  className='input-box3' onClick={() => {
                    deletePost({
                        variables : {
                            token : user.token,
                            id 
                        }
                    })
                }}>
                    Delete
                </button> 
                <button className='input-box3 ' onClick={() => {
                    history.push({
                        pathname: `/update/${id}`,
                        state: { text: post.text }
                    })
                }}>
                    Update
                </button>
            </div>
            : ""}
            <div>
                {post.userName}
            </div>
            <div>
                {calculateTime(post.createdAt)}
            </div>
            <div>
                {post.text}
            </div>
            <div style={{minHeight : "2rem"}}></div>
            <div className='flex-details'>
            <button className='input-box3'
                onClick={() => {
                    if(!user) return 
                    if(liked){
                        removeLike({       
                            variables : {
                                token : user.token,
                                id
                            }
                        })
                    }else{
                        addLike({       
                            variables : {
                                token : user.token,
                                id
                            }
                        })
                    }
                }}
            >
                LIKE
            </button>

            <div >Add Comment </div>
            <input className='input-box2'
                type="text" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className='input-box3'
                onClick={() => {
                    if(!user) return 
                    submitComment({       
                        variables : {
                            token : user.token,
                            id,
                            text : comment
                        }
                    })
                }}
            >
                SEND
            </button>
            </div>
     
            
            <div style={{minHeight : "2rem"}}></div>
            <div>
                Liked by : {getLikesList(post.likes)}
            </div>
            <div>Comments : </div>
            {post.comments.map((comment) => <Comment data={comment}/>)}
        </div>
        <div className='flex' >
        <button className='input-box3 ' onClick={() => history.push('/')}>
            Go Back
        </button>
        </div>
        
        </div>
    )

}
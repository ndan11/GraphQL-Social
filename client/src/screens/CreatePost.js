import { useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { CREATE_POST } from '../queries/PostQuery'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../context/auth'

export const CreatePost = () => {

    const {user} = useContext(AuthContext)
    const history = useHistory()
    const [text,setText] = useState('')

    const [createPost] = useMutation(CREATE_POST,{
        onCompleted({createPost}){
            let {err, msg} = createPost
            alert(msg)
            if(!err){
                history.push('/')
            }
        },
        onError(error){
            console.log("An Error Occured.")
        }
    });

    return(
        <>
            <div>
                Create A New Post
            </div>
            <div>
                Enter Some Text
            </div>
            <textarea
                rows = {5}
                value = {text}
                onChange = {(e) => setText(e.target.value)}
                required
            /><br/>
            <button
                onClick = {() => {
                    if(text.length == 0) alert("Text can not be empty.")
                    else{
                        createPost({
                            variables : {
                                token : user.token,
                                text
                            }
                        })
                    }
                }}
            >
                Post
            </button>
        </>
    )
}
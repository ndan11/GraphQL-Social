import { useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { UPDATE_POST } from '../queries/PostQuery'
import {useHistory, useParams} from 'react-router-dom'
import { AuthContext } from '../context/auth'

export const UpdatePost = (props) => {

    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const history = useHistory()
    const [text,setText] = useState(props.location.state.text)

    const [updatePost] = useMutation(UPDATE_POST,{
        onCompleted({updatePost}){
            let {err, msg} = updatePost
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
                Update this Post
            </div>
            <div>
                Change Some Text
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
                        updatePost({
                            variables : {
                                token : user.token,
                                id,
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
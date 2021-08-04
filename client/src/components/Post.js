import React from 'react'
import comment from '../assets/comment.png'
import like from '../assets/like.png'
import { useHistory } from 'react-router-dom'
import { calculateTime } from '../utils/calcTime'

export const Post = ({data}) => {

    const history = useHistory()

    return(
        <div className='post' onClick={() => {
            history.push(`/post/${data.id}`)
        }}>
            <div>
                {data.userName}
            </div>
            <div>
                {calculateTime(data.createdAt)}
            </div>
            <div>
                {data.text}
            </div>
            <div>
                <img src={like} height="40px"/>
                <div>
                    {data.likeCount}
                </div>
            </div>
            <div>
                <img src={comment} height="40px"/>
                <div>
                    {data.commentCount}
                </div>
            </div>
        </div>
    )
}
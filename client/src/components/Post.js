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
            <div className='username'>
               <h1>{data.userName}</h1> 
            </div>
            <div className='date-created'>
                {calculateTime(data.createdAt)}
            </div>
            <div className='text-input'>
                {data.text}
            </div>
            <div className="flex-box">
            <div>
                <img src={like} height="40px"/>
                <div className='likeCount'>
                    {data.likeCount}
                </div>
            </div>
            <div className='comment'>
                <img src={comment} height="40px"/>
                <div className='commentCount'>
                    {data.commentCount}
                </div>
            </div>
            </div>
        </div>
    )
}
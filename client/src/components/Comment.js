import React from 'react'
import { calculateTime } from '../utils/calcTime'

export const Comment = ({data}) => {

    const {userName, text, createdAt} = data

    return (
        <div style={{margin : "1rem"}}>
            <div>
                {userName}
            </div>
            <div>
                {text}
            </div>
            <div>
                {calculateTime(createdAt)}
            </div>
        </div>
    )
}
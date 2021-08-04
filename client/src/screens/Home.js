import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { Post } from '../components/Post'
import { GET_POSTS } from '../queries/PostQuery'
import '../style/styles.css'

export const Home = () => {
    
    const {loading, error, data} = useQuery(GET_POSTS,{
        pollInterval: 500
    })

    if(loading) return <div>Loading</div>

    return(
        <div>
            {data.getPosts.map((post) => <Post key={post.id} data={post}/>)}
        </div>
    )

}
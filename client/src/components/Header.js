import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import {useHistory} from 'react-router-dom'

export const Header = () => {

    const {user,logout} = useContext(AuthContext)
    const history = useHistory()

    console.log(user)

    return(
        <>
            {user? 
            <>
                <div>
                    {user.userName}
                </div>
                <button onClick={logout}>
                    Logout
                </button>
                <button onClick={() => history.push('/create')}>
                    Create Post
                </button>
            </> : 
            <>
                <button onClick={() => history.push('/login')}>
                    Login
                </button>
                <button onClick={() => history.push('/register')}>
                    Register
                </button>
            </>}
        </>
    )
}
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
            <div>
                <div className='user-header'>
                   <h3> {user.userName}</h3>
                </div>
                <button className='login-buttons3 flex' onClick={logout} >
                    Logout
                </button>
                <button className='login-buttons3 flex' onClick={() => history.push('/create') } >
                    Create Post
                </button>
            </div> : 
            <div>
                <button  className='login-buttons3 flex' style={{fontSize : '1.3rem'}} onClick={() => history.push('/login')}>
                    Login
                </button>
                <button  className='login-buttons3 flex' style={{fontSize : '1.3rem'}} onClick={() => history.push('/register')} >
                    Register
                </button>
            </div>}
        </>
    )
}
import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { LOGIN_USER } from '../queries/UserQuery'

export const Login = () => {

    const [email,setEmail] = useState("vraj")
    const [password,setPass] = useState("hello123")
    const [error,setError] = useState(null)

    const {login} = useContext(AuthContext)
    const history = useHistory()

    const [loginFunc] = useMutation(LOGIN_USER,{
        onCompleted({loginUser}){
            let {err, msg, token} = loginUser
            if(err){
                setError(msg)
            }else{
                login({
                    userName : email,
                    token : token
                })
                history.push("/")
            }
        },
        onError(error){
            console.log("An Error Occured.")
        }
    })

    return(
        <div className='login-flex login-body'>
            <label>Username or Email</label>
            <input 
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
           className='input-box' ></input><br/>
            <label>Password</label>
            <input 
                type='password'
                value={password}
                onChange={(e) => setPass(e.target.value)}
                className='input-box'></input>
            <button className='login-button' onClick={() => {
                loginFunc({
                    variables :{
                        email,
                        password
                    }
                })
            }}>
                Login
            </button>
            {error? <div>{error}</div> : ""}
        </div>
    )
}
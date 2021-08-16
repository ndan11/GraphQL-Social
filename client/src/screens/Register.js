import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { REGISTER_USER } from '../queries/UserQuery'

export const Register = () => { 

    const [values,setValues] = useState({
        first_name : "",
        last_name : "",
        email : "",
        userName : "",
        pass: "",
        con_pass: ""
    })

    const handleChange = (prop) => (event) => {
        setValues(prev => ({ ...prev, [prop]: event.target.value }));
    }

    const [error,setError] = useState(null)
    const history = useHistory()

    const [register] = useMutation(REGISTER_USER,{
        onCompleted({registerUser}){
            let {err, msg} = registerUser
            if(err){
                setError(msg)
            }else{
                history.push("/login")
            }
        },
        onError(error){
            console.log("An Error Occured.")
        }
    })

    return(
        <div className='login-flex-register'>
            <label>First Name</label>
            <input 
                type='text'
                value={values.first_name}
                onChange={handleChange('first_name')}
            className='input-box'></input><br/>
            <label>Last Name</label>
            <input 
                type='text'
                value={values.last_name}
                onChange={handleChange('last_name')}
                className='input-box'></input><br/>
            <label>Email</label>
            <input 
                type='text'
                value={values.email}
                onChange={handleChange('email')}
                className='input-box'></input><br/>
            <label>UserName</label>
            <input 
                type='text'
                value={values.userName}
                onChange={handleChange('userName')}
                className='input-box'></input><br/>
            <label>Password</label>
            <input 
                type='password'
                value={values.pass}
                onChange={handleChange('pass')}
                className='input-box'></input><br/>
            <label>Confirm Password</label>
            <input 
                type='password'
                value={values.con_pass}
                onChange={handleChange('con_pass')}
                className='input-box'></input><br/>
            <button className='login-button2' onClick={() => {
                if(values.pass != values.con_pass){
                    setError("Passwords do not match.")
                }else{
                    register({
                        variables :{
                            input : {
                                fname: values.first_name,
                                lname: values.last_name,
                                userName: values.userName,
                                email: values.email,
                                password: values.pass
                            }
                        }
                    })
                }
            }}>
               Register
            </button>
            {error? <div>{error}</div> : ""}
        </div>
    )
}
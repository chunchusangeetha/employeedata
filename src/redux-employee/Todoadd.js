import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Additem } from './todoSlice';
import { useDispatch } from 'react-redux';


export default function Todoadd() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [empData, setEmpData] = useState({
        name: "",
        phoneno: "",
        email: "",
        designation: ""
    })
    const { name, phoneno, email, designation } = empData;
    const [emailval, setEmailval] = useState([])


    useEffect(() => {
        if (emailval) {
            axios.get("https://employeedata-f65bd-default-rtdb.firebaseio.com/data.json", emailval)
                .then((response) => setEmailval(Object.values(response.data)))

        }
    }, [])
    console.log(emailval, 'axiosdata')

    const HandleChange = (e) => {
        setEmpData({ ...empData, [e.target.name]: e.target.value });
    };
    const clicktocancel = () => {
        setEmpData({
            name: "",
            phoneno: "",
            email: "",
            designation: ""
        })
        navigate('/')
    }

    const clicktosubmit = (e) => {
        e.preventDefault()
        if (!name || !phoneno || !email || !designation) {
            alert("please fill the input fields")
        } else {
            let isemail = true;
            emailval.forEach((obj) => {
                if (obj.email === email) {
                    isemail = false;
                }
            })

            if (isemail) {
                let newobj = {
                    id: new Date().getTime().toString(),
                    name: name,
                    phoneno: phoneno,
                    email: email,
                    designation: designation
                }
                console.log(newobj, 'obj')
                dispatch(Additem( newobj ))
                axios.post("https://employeedata-f65bd-default-rtdb.firebaseio.com/data.json", newobj)
                    .then(() => {
                        alert("data submitted")
                    })
                setEmpData({
                    name: "",
                    phoneno: "",
                    email: "",
                    designation: ""
                })
                navigate('/Todoview')
            } else {
                alert("email is alreay registered")
            }
        }
    }
    return (
        <div>
            <form>
                <div className='inputfields'>
                    <div className='heading'>
                        <h2>Employee Registration Form</h2>
                    </div>
                    <div className='inputfield'>
                        <label>Name:</label>
                        <input type='text' name='name' value={name} placeholder='enter your name' onChange={HandleChange} />
                    </div>
                    <div className='inputfield'>
                        <label>Phone Number:</label>
                        <input type='number' name='phoneno' value={phoneno} placeholder='enter your phonenumber' onChange={HandleChange} />
                    </div>
                    <div className='inputfield'>
                        <label>Email:</label>
                        <input type='email' name='email' value={email} placeholder='enter your email ' onChange={HandleChange} />
                    </div>
                    <div className='inputfield'>
                        <label>Designation:</label>
                        <input type='text' name='designation' value={designation} placeholder='enter your designation ' onChange={HandleChange} />
                    </div>
                    <div className='buttonfield'>
                        <button onClick={clicktosubmit}>Submit</button>
                    </div>
                    <div className='buttonfield'>
                        <button onClick={clicktocancel}>Cancel</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

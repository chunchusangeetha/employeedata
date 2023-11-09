
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Deleteitem, Edititem, Additem, Firstitem } from './todoSlice';

export default function Todoview() {
    const dispatch = useDispatch()
    const userdata = useSelector((state) => state.Todoview.todoArr)
    console.log(userdata, 'userdata')
    const navigate = useNavigate()

    const [empData, setEmpData] = useState({
        name: "",
        phoneno: "",
        email: "",
        designation: ""
    })
    const { name, phoneno, email, designation } = empData;
    const [empDetails, setEmpDetails] = useState([])
    const [editid, setEditid] = useState(null)
    const [displayform, setDisplayform] = useState(false)

    // const [empupdateddata, setEmpupdateddata] = useState(false)

    useEffect(() => {

        axios.get("https://employeedata-f65bd-default-rtdb.firebaseio.com/data.json", empDetails)
            .then((response) => dispatch(Firstitem((Object.values(response.data)))))

    }, [])
    

    const clicktodelete = (getid) => {
        dispatch(Deleteitem({ id: getid }))
    }
    const clicktoedit = (getid) => {

        setDisplayform(true)
        let editeditem = userdata.find((item) => item.id === getid);
        console.log(editeditem, 'edit')
        setEditid(getid)
        setEmpData({
            name: editeditem.name,
            phoneno: editeditem.phoneno,
            email: editeditem.email,
            designation: editeditem.designation
        })

    }
    const updateclick = (e) => {
        e.preventDefault();
        if (!name || !phoneno || !email || !designation) {
            alert("please fill the input fields")
        } else {
            dispatch(Edititem({
                Id: editid,
                Name: name,
                Phoneno: phoneno,
                Email: email,
                Designation: designation
            }))
            setDisplayform(false)
        }

        console.log(name, 76)
    }

    const HandleChange = (e) => {
        setEmpData({ ...empData, [e.target.name]: e.target.value });
    };

    const clicktoback = () => {
        navigate('/Todoadd')
    }

    //Pagination
    // const indexofarray = empDetails.length
    // console.log(indexofarray,'length')

    const [number, setNumber] = useState(1)

    const [postPerPage] = useState(5)

  
    const filtered = userdata.filter((item, index) => userdata.findIndex((items) => items.id === item.id) === index)

    const lastPost = number * postPerPage;
    const firstPost = lastPost - postPerPage;
    const currentpage = filtered.slice(firstPost, lastPost);
    console.log(currentpage, '108')
    const PageNumber = [];

    function nextPage() {
        number <= 1 ? setNumber(number + 1) : setNumber(1)
    }
    function previouspage() {

        number >= 1 ? setNumber(number - 1) : setNumber(1);
    }

    const pagehandler = (PageNumber) => {
        setNumber(PageNumber);
    }

    for (let i = 1; i <= Math.ceil(filtered.length / postPerPage); i++) {
        PageNumber.push(i);
    }
    return (
        <div className='tableclass'>

            <div className='heading'>
                <h2>Employee Details page </h2>
            </div>
            {displayform && (

                <form>
                    <div className='heading'>
                        <h3>Employee Details Update</h3>
                    </div>
                    <div className='Vinputfields'>

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
                        <div className='inputfield'>
                            <button type='submit' onClick={updateclick}>Update</button>
                        </div>
                    </div>
                </form>

            )}
            <div >
                <div className='heading'>
                    <h3>Employee Details</h3>
                </div>
                <table>
                    <thead>
                        <th>S.No</th>
                        <th>Emp id</th>

                        <th>Name</th>
                        <th>phone Number</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Edit </th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {
                            currentpage.map((item,index) => {
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phoneno}</td>
                                        <td>{item.email}</td>
                                        <td>{item.designation}</td>
                                        <td><button onClick={() => clicktoedit(item.id)}>Edit</button></td>
                                        <td><button onClick={() => clicktodelete(item.id)}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className='Buttonfield'>
                <button onClick={previouspage} > Previos </button>
                {
                    PageNumber.map((ele) => {
                        return (
                            <button onClick={() => pagehandler(ele)} > {ele} </button>
                        )
                    })
                }
                <button onClick={nextPage} > Next  </button>

            </div>
            <div className='Buttonfield'>
                <button onClick={clicktoback}>Go Back</button>
            </div>
        </div>
    )
}

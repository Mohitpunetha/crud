import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function signup() {
    const Router=useRouter()
    const [emaildetail,setEmaildetail]= useState("")
    const[passworddetail,setPassworddetails]=useState("")

    function getEmaildetail(e){
        setEmaildetail(e.target.value
          )
       
        // console.log(emaildetail)
      }
       function getPasswordDetails(e){
        setPassworddetails( e.target.value) 
        // console.log(passworddetail)
      }

    async function Create(){
        debugger
        const email=emaildetail
        const password=passworddetail
        const formData={
            email:email,
            password:password
        }

        const response= await axios.post("http://127.0.0.1:3001/signup/authcheck",formData)
        // console.log(response)

        if(response.status==200){
            alert("SucessFully Signed In")
            Router.push("/")
        }        

    }



  return (
    <>
<div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
<div className="card card0 border-0">
    <div className="row d-flex">
        <div className="col-lg-6">
            <div className="card1 pb-5">
                <div className="row">
                    <img src="https://i.imgur.com/CXQmsmF.png" className="logo"/>
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                    <img src="https://i.imgur.com/uNGdWHi.png" className="image"/>
                </div>
            </div>
        </div>
        <div className="col-lg-6">
            <h4>Create a user</h4>
            <div className="card2 card border-0 px-4 py-5">
                <div className="row px-3">
                    <label className="mb-1"><h6 className="mb-0 text-sm">Email Address</h6></label>
                    <input className="mb-4" type="text" name="email" placeholder="Enter a valid email address" onChange={getEmaildetail}/>
                </div>
                <div className="row px-3">
                    <label className="mb-1"><h6 className="mb-0 text-sm">Password</h6></label>
                    <input type="password" name="password" placeholder="Enter password" id="password" onChange={getPasswordDetails}/>
                </div>
                
                <div className='d-flex justify-content-'>
                <div className="row mt-3 mb-3 px-3">
                    <button  className="btn btn-primary text-center" onClick={Create}>Create
                    </button>
                </div>

                </div>
            </div>
        </div>
    </div>
    <div className="bg-blue py-4">
        <div className="row px-3">
            <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
            <div className="social-contact ml-4 ml-sm-auto">
                <span className="fa fa-facebook mr-4 text-sm"></span>
                <span className="fa fa-google-plus mr-4 text-sm"></span>
                <span className="fa fa-linkedin mr-4 text-sm"></span>
                <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
            </div>
        </div>
    </div>
</div>
</div>
    </>
  )
}

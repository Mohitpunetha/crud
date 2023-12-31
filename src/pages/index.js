import Head from 'next/head'
import Image from 'next/image'
import { IM_Fell_French_Canon, Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React,{ useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
function Home() {
const Router=useRouter()  
const [emaildetail,setEmaildetail]= useState()
const[passworddetail,setPassworddetails]=useState()
const[token,setToken]=useState()


  function getEmaildetail(e){
    setEmaildetail(e.target.value
      )
   
    // console.log(emaildetail)
  }
   function getPasswordDetails(e){
    setPassworddetails( e.target.value) 
    // console.log(passworddetail)
  }



  async function signin(e){
    e.preventDefault()
    const email= emaildetail;
    const password=passworddetail;
    const existingToken = localStorage.getItem("token")
    const formData={
      "email":email,
      "password":password,
      "token": existingToken
  }
  // const alldata=JSON.stringify(formData)
  // console.log(formData)
  try {    
    const response = await axios.post('http://127.0.0.1:3001/signin/authcheck',formData)
    // console.log("this is response",response)
    const token=response.data.token
    if(token){
    setToken(token)
    localStorage.setItem("token",token)
    }    
    // Access the response data using response.data
    // console.log(response.data.token,"this is the token");
    if(true){
      Router.push("/alter") 
    }
  } catch (error) {
    console.error('AxiosError:', error);
  }
  }  
  
  function signup(){
  Router.push("/signup")
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
                    <button  className="btn btn-primary text-center" onClick={signin}>Login
                    </button>
                </div>
                <div className="row mt-3 mb-3 px-3">
                    <button className="btn btn-primary text-center" onClick={signup}>Signup
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div className="bg-blue py-4">
        <div className="row px-3">
          <div className='d-flex'>
            <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
           
            </div>
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
export default Home;





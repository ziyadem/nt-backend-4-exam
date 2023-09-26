import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import axios from "axios";

const Registratsiya = () => {
  const navgation=useNavigate();
  const [img, imgState] = useState('');
  useEffect(()=>{
    let token=localStorage.getItem("token");
    if (token) navgation("/asosiysayt")
},[])

     //uploadFile
  const uploadPostFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "exam_three_backend");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsv0yl7sh/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const data2 = await res.json();
    let img = data2.secure_url;
    imgState(img);
  };

 async  function handleClick(e){
    e.preventDefault()
    try {
      const firstname = e.target.firstname.value;
      const lastname = e.target.lastname.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const ConfirmPassword = e.target.ConfirmPassword.value;
      if(ConfirmPassword !==password){
       return toast('confirm password xato', { type: "error" });
      }
      let data = { 
        firstname,
        lastname,
        email,
        password,
        img
       };
       console.log(data);
axios.defaults.baseURL = "http://localhost:7890";

      let res = await axios.post("user/register", data);
      // let res2 = await axios.post(`/user/login`, data);
      console.log(res);
      if (res) {
        toast(res.data.message, { type: "success" });
        console.log(res);
        // localStorage.setItem("token", res.data.token);
        // navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast(error.response?.data?.message, { type: "error" });
    }
  }

    console.log("img", img);
  return (
    <div>
      <div className="container d-flex justify-content-center Login_container  align-items-center min-vh-100">
        <form
          onSubmit={(e) => handleClick(e)}
          className="form-control w-50 p-5 border bg-white shadow rounded"
        >
          <h1 className="display-4 text-center">Registratsiya</h1>
          <input
            type="text"
            required
            name="firstname"
            id="firstname"
            className="form-control mb-3"
            placeholder="Firstname"
            min={3}
          />
          <input
            type="text"
            required
            name="lastname"
            id="lastname"
            className="form-control mb-3"
            placeholder="Lastname"
            min={3}
          />
          <input
            type="email"
            required
            name="email"
            id="email"
            className="form-control mb-3"
            placeholder="Your Email"
            min={3}
          />
          <input
            type="file"
            required
            name="file"
            id="file"
            className="form-control mb-3"
            onChange={uploadPostFile}
          />
          <input
            type="password"
            required
            name="password"
            className="form-control mb-3"
            id="password"
            placeholder="Your password"
            min={3}
          />
          <input
            type="password"
            required
            name="ConfirmPassword"
            className="form-control mb-3"
            id="ConfirmPassword"
            placeholder="Confirm password"
            min={3}
          />

          <button className="btn btn-primary  w-100 d-block mb-3" >
            Ro'yxatdan O'tish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registratsiya

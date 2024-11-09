import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils/ToastHandle';
import './SignUp.css'

function SignUp() {

  const [signUpInfo, setsignUpInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pic: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    const copyInfo = { ...signUpInfo }
    copyInfo[name] = value;
    setsignUpInfo(copyInfo);
  }

  const handlePhoto = (e) => {
    console.log(e.target.files);

    setsignUpInfo({ ...signUpInfo, pic: e.target.files[0] });
    console.log(signUpInfo);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, pic } = signUpInfo;
    if (!name || !email || !password || !confirmPassword) {
      return handleError('Missing Fields')
    }
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      if (pic) formData.append('pic', pic);
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        body: formData
      })
      const result = await response.json();
      const { message, success} = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/signin')
        }, 1000)
      }
      else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err)
    }
  }

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp} className="actForm">
          <div className="form-group">
            <label htmlFor="name" className="labelText">Full Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={signUpInfo.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="labelText">E-mail:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={signUpInfo.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="labelText">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={signUpInfo.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="labelText">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
              value={signUpInfo.confirmPassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pic" className="labelText">Profile Image:</label>
            <input
              type="file"
              accept='.png, .jpg, .jpeg'
              name="pic"
              id="pic"
              onChange={handlePhoto}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="button">SignUP</button>
            <span>Already have an Account?<Link to="/signin">Click here</Link></span>
          </div>
        </form>
      </div>
      <div className="text-container">
        <h1>GupShup</h1>
        <h2>A new journey begins here. Let's get started!</h2>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignUp
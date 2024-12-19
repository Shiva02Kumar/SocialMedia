import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils/ToastHandle';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SignUp.css'

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [signInInfo, setsignInInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    const copyInfo = { ...signInInfo }
    copyInfo[name] = value;
    setsignInInfo(copyInfo);
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = signInInfo;
    if (!email || !password) {
      return handleError('Missing Fields')
    }
    try {
      const response = await fetch("/auth/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInInfo),
        credentials: 'include'
      })
      const result = await response.json();
      
      const { message, success } = result;
      
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/home')
        }, 1000)
        setLoading(false);
      }
      else if (!success) {
        handleError(message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      
      handleError(err)
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="text-container">
        <h1>GupShup</h1>
        <h2>Ready to dive in? Let's make today productive!</h2>
      </div>
      <div className="form-container">
        <h2>Log In</h2>
        <form onSubmit={handleSignIn} className="actForm">
          <div className="form-group">
            <label htmlFor="email" className="labelText">E-mail:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={signInInfo.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="labelText">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={signInInfo.password}
            />
          </div>
          <div className="form-group">
            <div>
              {/* <button type="submit" className="button">Log In</button> */}
              <button type="submit" className="button">{loading ? <FontAwesomeIcon icon={faSpinner} spinPulse/> : "Log In"}</button>
            </div>
            <span>Don't have an Account? <Link to="/signup">Click here</Link></span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignIn
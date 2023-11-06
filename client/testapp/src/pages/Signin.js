import axios from 'axios';
import {useState} from 'react';
import Footer from '../Footer.js';
import {Link, Navigate, useLocation} from 'react-router-dom'

// import './App.css';

function Signin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [isEmployer, setIsEmployer] = useState('')
  const [user, setUser] = useState(null)
  const location = useLocation()
  const userSignup = location.state

  const submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/signin',{username: username, password: password, isEmployer: isEmployer})
    .then((res) => {
      console.log(res)

      if (res.data.message) {
        setLoginStatus(res.data.message)
      } else {
        setUser(res.data[0])
      }

    })
  }

  
  return (
    <div className="App">
      {userSignup ? <h4 className='mt-20 text-xl text-center text-white font-serif'> Hi {userSignup}, please sign in below! </h4> : null}
      <form className='mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-green-400 mt-10 h-84 font-serif' onSubmit={submitHandler}>
        <h3 className='pb-6 text-2xl text-center text-white'>Sign In</h3>
        <label className='block mb-1 text-lg text-white' htmlFor='isEmployer'>Are you an employer?</label>
        <select className='w-20 focus:outline-none' onChange={(e) => setIsEmployer(e.target.value)} required>
              <option value='' hidden>{''}</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>        <label className='block mb-1 text-lg text-white' htmlFor='username'>Username</label>
        <input className='w-full h-8 p-2 mb-6 focus:outline-none' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className='block mb-1 text-lg text-white' htmlFor='password'>Password</label>
        <input className='w-full h-8 p-2 mb-1 focus:outline-none' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <ul className='underline block mb-1 text-xs text-blue-400'>
          <Link to='/signup'>Create account</Link>
        </ul>

        <div className='text-xs text-center text-red-500 mb-2'>{loginStatus}</div>
        
        <div className='flex justify-between'>
            <button className='px-3 py-1 rounded-sm bg-green-400' type='submit'>
              Submit 
            </button>        
        </div>
        
        {user ? <Navigate to='/job' replace={true} state={user} /> : null}

      </form>
      <Footer />
    </div>
  );
}

export default Signin;

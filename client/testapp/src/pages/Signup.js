import axios from 'axios';
import {useState} from 'react';
import Footer from '../Footer.js';
import {Navigate} from 'react-router-dom'

function Signup() {

  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [pemail, setPEmail] = useState('')
  const [wemail, setWEmail] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [wstatus, setWStatus] = useState('')
  const [isEmployer, setIsEmployer] = useState('')
  const [work, setWork] = useState([{company:'', position:'', startwork:'', endwork:null}])
  const [signupStatus, setSignupStatus] = useState('')
  const [user, setUser] = useState(null)


  const submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/signup',{fname: fname, lname: lname, pemail: pemail, wemail: wemail, username: username, password: password, wstatus: wstatus, work: work, isEmployer:isEmployer})
    .then((res) => {
      console.log(res)

      if (res.data.message) {
        setSignupStatus(res.data.message)
      } 
      else {
        setUser(res.data)
        setSignupStatus('')
      }
    })
  }

  const clearInput = () => {
    setFName(''); setLName(''); setPEmail(''); setWEmail(''); setUsername(''); setPassword(''); setWStatus('');
  }

  const companyNameChange = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/signupCompany',{companyName: fname})
    .then((res) => {
      console.log(res)
      if (res.data.message) {
        setSignupStatus(res.data.message)
      } 
    })
  }

  const handlechange = (e, set, list, index) => {
    const {name, value} = e.target
    const temp_list = [...list]
    temp_list[index][name] = value
    set(temp_list)
  }

  return (
    <div className="App text-sm">
        <form className='mx-auto border-2 p-9 md:p-12 md:w-96 border-green-400 mt-20 h-84 w-72 font-serif' onSubmit={submitHandler}>
          <h3 className='pb-6 text-2xl text-center text-white'>Create Account</h3>
          <label className='block mb-1 text-white' htmlFor='userType'>Are you an employer?</label>
          <select className='w-20 focus:outline-none' onChange={(e) => setIsEmployer(e.target.value)} required>
              <option value='' hidden>{''}</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
          </select>

          {isEmployer === 'No' && (
          <div>
          <label className='block mb-1 text-white' htmlFor='fname'>First Name</label>
          <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='fname' type='text' value={fname} onChange={(e) => setFName(e.target.value)} required />
          <label className='block mb-1 text-white' htmlFor='lname'>Last Name</label>
          <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='lname' type='text' value={lname} onChange={(e) => setLName(e.target.value)} required />
          <label className='block mb-1 text-white' htmlFor='pemail'>Personal Email</label>
          <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='pemail' type='email' value={pemail} onChange={(e) => setPEmail(e.target.value)} required />
          <label className='block mb-1 text-white' htmlFor='pemail'>Work Email</label>
          <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='wemail' type='email' value={wemail} onChange={(e) => setWEmail((e.target.value === '') ? null : e.target.value)} />
          <label className='block mb-1 text-white' htmlFor='username'>Username</label>
          <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <label className='block mb-1 text-white' htmlFor='password'>Password</label>
          <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label className='block mb-1 text-white' htmlFor='employ'>Are you current employed?</label>         
          <select className='w-20 focus:outline-none' onChange={(e) => setWStatus(e.target.value)} required>
            <option value='' hidden>{''}</option>
            <option value='Employed'>Yes</option>
            <option value='Unemployed'>No</option>
          </select>
            

          {/* {wstatus === 'Employed' && (
            <div>
              <div className='grid grid-cols-[25%_25%_20%_20%] gap-3'>
                <label className='block text-white' htmlFor='company'>Company</label>
                <label className='block text-white' htmlFor='position'>Position</label>
                <label className='block text-white' htmlFor='startwork'>Start year (YYYY)</label>
                <label className='block text-white' htmlFor='endwork'>End year (YYYY)</label>
              </div>
            {work.map((singleWork, index) => (
            <div key={index} className='experience'>
              <div className='grid grid-cols-[25%_25%_20%_20%] gap-3'>
                <input className='h-8 p-2 mb-3 focus:outline-none' name='company' type='text' id='company' required 
                value = {singleWork.company}
                onChange={(e) => handlechange(e, setWork, work, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='position' type='text' id='position' required 
                value = {singleWork.position}
                onChange={(e) => handlechange(e, setWork, work, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='startwork' type='text' id='startwork' pattern='^\d{4}$' required 
                value = {singleWork.startwork}
                onChange={(e) => handlechange(e, setWork, work, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='endwork' type='text' id='endwork' pattern='^\d{4}$'
                value = {singleWork.endwork}
                onChange={(e) => handlechange(e, setWork, work, index)}
                />
              </div>
            </div>
          ))}
            </div>
          )} */}
          </div> 
          )}

          {isEmployer === 'Yes' && (
            <div>
              <label className='block mb-1 text-white' htmlFor='fname'>Company Name</label>
              <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='fname' type='text' value={fname} onChange={(e) => setFName(e.target.value)} required />
              <label className='block mb-1 text-white' htmlFor='lname'>Company Link</label>
              <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='lname' type='link' value={lname} onChange={(e) => setLName(e.target.value)} required />
              <label className='block mb-1 text-white' htmlFor='pemail'>Company Email</label>
              <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='pemail' type='email' value={pemail} onChange={(e) => setPEmail(e.target.value)} required />
              <label className='block mb-1 text-white' htmlFor='username'>Username</label>
              <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
              <label className='block mb-1 text-white' htmlFor='password'>Password</label>
              <input className='w-full h-8 p-2 mb-3 focus:outline-none' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          )}
          

          <div className='text-xs text-center text-red-500 mb-2'>{signupStatus}</div>

          <div className='flex justify-between'>
            <button className='px-3 py-1 rounded-sm bg-green-400' type='submit'>Submit</button>
          </div>

          {user ? <Navigate to='/' replace={true} state={user} /> : null}
        </form>
        <Footer />
    </div>
  );
}

export default Signup;

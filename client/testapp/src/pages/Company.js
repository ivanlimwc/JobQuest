import axios from 'axios';
import {useState} from 'react';
import Footer from '../Footer.js';
import { FaSearch } from 'react-icons/fa'
import { AiOutlineMinus, AiOutlineCheck, AiFillStar } from 'react-icons/ai'
import {Link, useLocation} from 'react-router-dom'

// import './App.css';

function Company() {
  const location = useLocation()
  const user = location.state

  const [companyInput, setCompanyInput] = useState('');
  const [search0, setSearch0] = useState('')
  const [results, setResults] = useState([]);
  const starArray = [...Array(5).keys()].map(i => i + 1);
 
  const submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/company',{companyName: companyInput})
    .then((res) => {
      console.log(res)
      
      if (res.data.message) {
        setSearch0(res.data.message)
      } else {
        setResults(res.data)
        setSearch0('')
      }

    })
  }
  
  const handleChange = (set,event) => {
    set(event.target.value)
  }

  const Icon = (input) => {
    if(input.input === 'Yes'){
      return <AiOutlineCheck id='check-icon' size={25} />
    } else {
      return <AiOutlineMinus id='minus-icon' size={25} />
    }
  }

  const ReviewResults = ({results}) => {
    return <div>
      <span className='mt-3'></span>
      {results.map((result,i)=>{
        return <div className='mb-3' key={i}>
          <div className='company-review-wrapper'>
            <div className='font-bold text-lg mr-3'>{result.company_name}</div>
            {starArray.map((star,i)=>{
              return <AiFillStar size={20} id={i}
              color={result.company_rating > i ? "orange" : "lightgrey"}
              />        
            })}
            
          </div>
          <div className='flex justify-left gap-3'>
            <Icon input={result.company_recommend}/>
            <div>Recommend to friend</div>
            <Icon input={result.company_approveceo}/>
            <div>Approve of CEO</div>
            <Icon input={result.company_busoutlook}/>
            <div>Business outlook</div>
            <Icon input={result.company_balance}/>
            <div>Work-life balance</div>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <label className='underline'>Employee's review</label>
            <label className='underline'>Company's response</label>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div>{result.user_feedback}</div>
            <div>{result.company_response}</div>
          </div>
        </div>
      })}    
    </div>
  }
  
  return (
    <div className='App ml-10 font-serif'>
      <form className='grid grid-cols-[40%_5%_50%] gap-3 mt-10' onSubmit={submitHandler}>
          <div className='input-wrapper'>
              <FaSearch id='search-icon' size={25} />
              <input className='text-lg w-full ml-3 focus:outline-none' placeholder='Search for company' required 
              value={companyInput} 
              onChange={(e) => handleChange(setCompanyInput,e)}
              />
          </div>

          <button className='h-8 w-20 rounded-xl border border-green-200 text-lg text-green-200' type='submit'>
              search
          </button>
          <div className='flex justify-end'>
              <Link to='/review' state={user}> 
                  <button className='h-8 w-56 rounded-xl bg-green-400 text-lg' type='button'>
                  Review your company
                  </button>
              </Link>
          </div>
      </form>

      {search0 === '' && (
        <div className='results-list'>
          <ReviewResults results={results}/>
        </div>
      )} 

      {search0 != '' && (
        <div className='mt-3 text-white'>{search0}</div>
      )}
            
      <Footer />
    </div>
  );
}

export default Company;

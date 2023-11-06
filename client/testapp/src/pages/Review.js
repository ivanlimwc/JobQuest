import axios from 'axios';
import {useState} from 'react';
import {useLocation} from 'react-router-dom'
import Footer from '../Footer.js';
import {Link} from 'react-router-dom'
import { companies } from '../components.js/company.ts';
import Select from 'react-select';

// import '../components.js/SearchBar.css'
// import './App.css';

function Review() {
    const location = useLocation()
    const user = location.state

    const [company, setCompany] = useState('');
    const [ranking, setRanking] = useState('');
    const [rec, setRec] = useState('');
    const [ceo, setCEO] = useState('');
    const [busOutlook, setBusOutlook] = useState('');
    const [wlbalance, setWlbalance] = useState('');
    const [feedback, setFeedback] = useState('');
    const [reviewStatus, setReviewStatus] = useState('')
    const [reviews, setReviews] = useState([]);
    const companyOptions = companies;

    const submitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8080/review',{userid: user.user_id, company: company, ranking: ranking, reccommend: rec, ceoApprove: ceo, busOutlook: busOutlook, wlbalance:wlbalance, feedback:feedback})
        .then((res) => {
          console.log(res)
    
        if (res.data.message) {
            setReviewStatus(res.data.message)
        } else {
            setReviews([...reviews, {company: company, ranking: ranking, reccommend: rec, ceoApprove: ceo, busOutlook: busOutlook, wlbalance:wlbalance, feedback:feedback}])
            setCompany(''); setRanking(''); setCEO(''); setRec(''); setBusOutlook(''); setWlbalance(''); setFeedback('');
            setReviewStatus('');
        }

        })
      } 

    const handleChange = (set,event) => {
        set(event.target.value)
    }

    const handleSelectChange = (set, selectedValues) => {
        set(selectedValues);
    };

    const Dropdown = ({className, label, value, options, onChange}) => {
        return (
            <select className={className} value={value} onChange={onChange} required>
                <option value = '' disabled hidden>{label}</option>
                {options.map((option)=>
                    <option value={option.value}>{option.label}</option>
                )}
            </select>
        )
    }

    const CompanyDropdown = ({label, value, options, onChange}) => {
        return (
            <Select value={value} onChange={onChange}
                options = {options}
                styles={selectStyles}
                placeholder={label}
                closeMenuOnSelect={false} 
                closeMenuOnScroll={false}
                hideSelectedOptions={false}
                isClearable={true}
                menuPlacement="auto"
                menuPosition="fixed"
            />
        )
    }

    const selectStyles = {
        control: baseStyles => ({
            ...baseStyles,
            borderRadius: '200px',
            fontSize: 16,
            border: 0,
            boxShadow: 'none',
            height: 2,
        }),
        
        option: (styles,state) => ({
            ...styles,
            fontSize: 16,
            color: state.isSelected ? 'white' : 'green',
            backgroundColor: state.isSelected ? 'grey' : 'inherit',
        }),

        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: 'green',
            }
        },

        indicatorSeparator: () => null,
    };
    

  return (
    <div className="App">
        <form className='mt-10 ml-10 font-serif' onSubmit={submitHandler}>
            <h3 className='mb-3 font-bold text-2xl text-green-200'>Review your company!</h3>
        
            <div className='grid grid-cols-[20%_11%] gap-3'>
                <input className='focus:outline-none input-wrapper width-30' placeholder='Company name' required 
                    value={company} 
                    onChange={(e) => handleChange(setCompany,e)}
                    />
            {/* <Dropdown 
                    className='focus:outline-none'
                    label='Choose company'
                    options={companyOptions}
                    // {[
                    //     {label: 'Company1', value:'Company1'},
                    //     {label: 'Company2', value:'Company2'},
                    //     {label: 'Company3', value:'Company3'},
                    //     {label: 'Company4', value:'Company4'},
                    //     {label: 'Company5', value:'Company5'},
                    //     {label: 'Company6', value:'Company6'},
                    // ]}
                    value={company}
                    onChange={(e) => handleSelectChange(setCompany, e)}/>                 */}
                        
                <Dropdown
                    className='focus:outline-none'
                    label='Overall rating'
                    options={[
                        {label: 1, value: 1},
                        {label: 2, value: 2},
                        {label: 3, value: 3},
                        {label: 4, value: 4},
                        {label: 5, value: 5},
                    ]}
                    value={ranking}
                    onChange={(e) => handleChange(setRanking, e)}/>
            </div>

            <div className='grid grid-cols-[20%_15%_16%_10%]'>
                <span className='text-green-200 text-lg'>Recommend to a friend</span>
                <span className='text-green-200 text-lg'>Approve of CEO</span> 
                <span className='text-green-200 text-lg'>Business outlook</span>               
                <span className='text-green-200 text-lg'>Work-life balance</span>                             
            </div>

            <div className='grid grid-cols-[20%_15%_16%_10%]'>
                <Dropdown 
                        className='w-20 focus:outline-none '
                        label=''
                        options={[
                            {label: 'Yes', value:'Yes'},
                            {label: 'No', value:'No'},
                        ]}
                        value={rec}
                        onChange={(e) => handleChange(setRec, e)}/>         
                <Dropdown 
                        className='w-20 focus:outline-none '
                        label=''
                        options={[
                            {label: 'Yes', value:'Yes'},
                            {label: 'No', value:'No'},
                        ]}
                        value={ceo}
                        onChange={(e) => handleChange(setCEO, e)}/>
                <Dropdown 
                        className='w-20 focus:outline-none '
                        label=''
                        options={[
                            {label: 'Yes', value:'Yes'},
                            {label: 'No', value:'No'},
                        ]}
                        value={busOutlook}
                        onChange={(e) => handleChange(setBusOutlook, e)}/>
                <Dropdown 
                        className='w-20 focus:outline-none '
                        label=''
                        options={[
                            {label: 'Yes', value:'Yes'},
                            {label: 'No', value:'No'},
                        ]}
                        value={wlbalance}
                        onChange={(e) => handleChange(setWlbalance, e)}/>
            </div>

            <div className='font-serif'>
                <label className='block text-green-200 text-lg'>Review: </label>
                <textarea className='p-2 mb-1 focus:outline-none' rows={5} cols={120} id='cons' type='text' value={feedback} required onChange={(e) => setFeedback(e.target.value)} />
            </div>

            {reviewStatus != '' && (
                <div className='text-sm text-red-500'>{reviewStatus}</div>
            )}

            <button className='mt-3 px-3 py-1 rounded-sm bg-green-400' type='submit'>Submit</button>

        </form>
        
        {reviews.length>0 && (
            <div className='ml-10 mt-10 font-serif'>
                <div className='border-b border-cyan-200'>
                    <h3 className='font-bold text-lg text-cyan-200'>Your review</h3>                
                </div>
                <div className='grid grid-cols-[20%_10%_15%_10%_10%_10%_5%_6%] mt-3 text-cyan-200 text-center'>
                    <div className='text-left'>Company</div>
                    <div>Overall rankings</div>
                    <div>Recommend to a friend</div>
                    <div>Approve of CEO</div>
                    <div>Business outlook</div>
                    <div>Work-life balance</div>
                </div>
            </div>
        )}
        
        
            
        {reviews.map((review,index) => {
            return <div className='ml-10 font-serif'>
                <div className='grid grid-cols-[20%_10%_15%_10%_10%_10%_5%_6%] text-white text-center' id={index}>
                    <div className='text-left'>{review.company}</div>
                    <div>{review.ranking}/5</div>
                    <div>{review.reccommend}</div>
                    <div>{review.ceoApprove}</div>
                    <div>{review.busOutlook}</div>
                    <div>{review.wlbalance}</div>
                    <button className='edit-btn px-3 ml-3 mb-1 py-1 rounded-sm border border-cyan-200 text-xs text-cyan-200' type='button' 
                    // onClick={handleAddEducation}>
                    >
                    Edit
                    </button>
                    <button className='rmv-btn px-3 ml-3 mb-1 py-1 rounded-sm border border-cyan-200 text-xs text-cyan-200' type='button' 
                    // onClick={handleAddEducation}>
                    >
                    Remove
                    </button>
                </div>
            </div>
        })}
        
        
        
                
       


        <Footer />
    </div>
  );
}

export default Review;

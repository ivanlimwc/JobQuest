import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import Footer from '../Footer.js';
import {useLocation} from 'react-router-dom'

function Profile() {
  const location = useLocation()
  const user = location.state

  const input_limit = 5;
  // education variables
  const [education, setEducation] = useState([{college:'', degree:'', major:'', startedu:'', endedu:null}])
  const [editEdu, setEditEdu] = useState([]) // this is used to store the index of education that the user change/wanna update
  const [userEdu, setUserEdu] = useState([]) // this is used to store the user's existing education experience
  const [userEduCopy, setUserEduCopy] = useState([]) // this is the copy of userEdu

  // work variables
  const [work, setWork] = useState([{company:'', position:'', startwork:'', endwork:null}])
  
  // others 
  const [skillList, setSkillList] = useState([{skill: ''}])
  const [saveStatus, setSaveStatus] = useState(true)

  useEffect(() => {
    if(saveStatus){
      setSaveStatus(false)
      console.log('here')
      axios.get('http://localhost:8080/education', {params: {userid: user.user_id}})
      .then(res => {
        setUserEdu(res.data)
        setUserEduCopy(JSON.parse(JSON.stringify(res.data)));
        // setUserEduCopy(res.data)

      })
    } 
    setUserEduCopy(JSON.parse(JSON.stringify(userEdu)));
  },[saveStatus])


  const submitHandler = e => {
    setEducation([{college:'', degree:'', major:'', startedu:'', endedu:null}]);
    setSaveStatus(true);
    e.preventDefault();
    axios.post('http://localhost:8080/profile',{userid: user.user_id, education: education, work: work})
  } 

  const RemoveUserEdu = (e,index) => {
    setSaveStatus(true);
    e.preventDefault();
    axios.post('http://localhost:8080/removeEdu',{userid: user.user_id, removeEdu: userEdu[index]})
  }

  const submitEducation = e => {
    setEducation([{college:'', degree:'', major:'', startedu:'', endedu:null}]);
    setSaveStatus(true);
    e.preventDefault()
    axios.post('http://localhost:8080/education',{userid: user.user_id, education: education, orgEdu: userEduCopy, updateEdu: userEdu, updateIndex: editEdu})
  } 

  const submitWork = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/work',{userid: user.user_id, work: work})
    .then((res) => {
      console.log(res)
    })
  } 

  const handleAddEducation = () => {
    setEducation([...education, {college:'', degree:'', major:'', startedu:'', endedu: null}])
  }

  const handleAddSkill = () => {
    setSkillList([...skillList, {skill:''}])
  }

  const handleAddWork = () => {
    setWork([...work, {company:'', position:'', wemail:null, startwork:'', endwork: null}])
  }

  const handleRemove = (set, list, index) => {
    const temp_list = [...list]
    temp_list.splice(index,1)
    set(temp_list)
  }
  
  const handlechange = (e, set, list, index) => {
    const {name, value} = e.target
    const temp_list = [...list]
    if (value === '') {
      temp_list[index][name] = null
    } else {
      temp_list[index][name] = value
    }
    set(temp_list)
  }

  const handleChangeEdit = (e, set, list, index, editSet, editList) => {
    const {name, value} = e.target
    const temp_list = [...list]
    if (value === '') {
      temp_list[index][name] = null
    } else {
      temp_list[index][name] = value
    }
    set(temp_list)
    editSet([...editList, index]) // add the edu that was changed by the user
  }
  console.log('edit edu', editEdu)
  console.log('user edu', userEdu)
  console.log('copy', userEduCopy)


  return (
    <div className="App">
      <form className='p-9 font-serif' onSubmit={submitEducation}>
        <h3 className='pb-3 font-bold text-2xl text-green-200'>Education</h3>
          <div className='grid grid-cols-[20%_15%_20%_10%_10%_5%_6%] gap-3'>
            <label className='block text-white' htmlFor='college'>College</label>
            <label className='block text-white' htmlFor='degree'>Degree</label>
            <label className='block text-white' htmlFor='major'>Major</label>
            <label className='block text-white' htmlFor='startedu'>Start year</label>
            <label className='block text-white' htmlFor='endedu'>End year</label>
          </div>

          {userEdu.map((singleEducation, index) => (
            <div key={index} className='grid grid-cols-[20%_15%_20%_10%_10%_6%] gap-3'>
              <input className='h-8 p-2 mb-3 focus:outline-none' name='college' type='text' id='college' required 
                value = {singleEducation.college}
                onChange={(e) => handleChangeEdit(e,setUserEdu,userEdu,index,setEditEdu,editEdu)}
              />
              <input className='h-8 p-2 mb-3 focus:outline-none' name='degree' type='text' id='degree' required 
              value = {singleEducation.degree}
              onChange={(e) => handleChangeEdit(e,setUserEdu,userEdu,index,setEditEdu,editEdu)}
              />
              <input className='h-8 p-2 mb-3 focus:outline-none' name='major' type='text' id='major' required 
              value = {singleEducation.major}
              onChange={(e) => handleChangeEdit(e,setUserEdu,userEdu,index,setEditEdu,editEdu)}
              />
              <input className='h-8 p-2 mb-3 focus:outline-none' name='educ_start' type='text' id='educ_start' pattern='^\d{4}$' required 
              placeholder='YYYY'
              value = {singleEducation.educ_start}
              onChange={(e) => handleChangeEdit(e,setUserEdu,userEdu,index,setEditEdu,editEdu)}
              />
              <input className='h-8 p-2 mb-3 focus:outline-none' name='educ_end' type='text' id='educ_end' pattern='^\d{4}$'
              placehoslder='YYYY'
              value = {singleEducation.educ_end} 
              onChange={(e) => handleChangeEdit(e,setUserEdu,userEdu,index,setEditEdu,editEdu)}
              />
              <button className='rmv-btn px-3 mb-1 py-1 rounded-sm border border-green-200 text-xs text-green-200' 
              type='button' 
              onClick={(e) => RemoveUserEdu(e,index)}>
              Remove
              </button>
            </div>           
          ))} 

          {/* <button className='edit-btn px-3 mb-3 py-1 rounded-sm border border-green-200 text-xs text-green-200' 
          type='button' 
          > 
          Edit
          </button> */}
          

          {education.map((singleEducation, index) => (
            <div key={index} className='educations'>
              <div className='grid grid-cols-[20%_15%_20%_10%_10%_6%] gap-3'>
                <input className='h-8 p-2 mb-3 focus:outline-none' name='college' type='text' id='college' required 
                value = {singleEducation.college}
                onChange={(e) => handlechange(e, setEducation, education, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='degree' type='text' id='degree' required 
                value = {singleEducation.degree}
                onChange={(e) => handlechange(e, setEducation, education, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='major' type='text' id='major' required 
                value = {singleEducation.major}
                onChange={(e) => handlechange(e, setEducation, education, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='startedu' type='text' id='startedu' pattern='^\d{4}$' required 
                placeholder='YYYY'
                value = {singleEducation.startedu}
                onChange={(e) => handlechange(e, setEducation, education, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='endedu' type='text' id='endedu' pattern='^\d{4}$' 
                placeholder='YYYY'
                value = {singleEducation.endedu}
                onChange={(e) => handlechange(e, setEducation, education, index)}
                />


                {education.length > 1 && (
                  <button type='button' className='remove-btn px-3 py-1 mb-3 rounded-sm border border-green-200 text-xs text-green-200' 
                  onClick={() => handleRemove(setEducation,education,index)}> 
                    <span>Remove</span>
                  </button>
                )} 
              </div>
              
              {education.length -1 === index && education.length < input_limit && (
                <div className='pb-5'>
                  <button className='add-btn px-3 py-1 rounded-sm border border-green-200 text-xs text-green-200' type='button' 
                  onClick={handleAddEducation}>
                    Add Education
                  </button>
                </div>
              )}
            </div>
          ))}
        
        <button className='px-3 py-1 rounded-sm bg-green-400' type='submit'>Save</button>
      </form>

      <form className='p-9 font-serif' onSubmit={submitWork}>
        <h3 className='pb-3 font-bold text-2xl text-green-200'>Work Experience</h3>
        <div className='grid grid-cols-[20%_20%_15%_15%_5%] gap-3'>
          <label className='block text-white' htmlFor='company'>Company</label>
          <label className='block text-white' htmlFor='position'>Position</label>
          <label className='block text-white' htmlFor='startwork'>Start year</label>
          <label className='block text-white' htmlFor='endwork'>End year</label>
        </div>

        {work.map((singleWork, index) => (
            <div key={index} className='experiences'>
              <div className='grid grid-cols-[20%_20%_15%_15%_5%] gap-3'>
                <input className='h-8 p-2 mb-3 focus:outline-none' name='company' type='text' id='company' required 
                value = {singleWork.company}
                onChange={(e) => handlechange(e, setWork, work, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='position' type='text' id='position' required 
                value = {singleWork.position}
                onChange={(e) => handlechange(e, setWork, work, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='startwork' type='text' id='startwork' pattern='^\d{4}$' required 
                placeholder='YYYY'
                value = {singleWork.startwork}
                onChange={(e) => handlechange(e, setWork, work, index)}
                />
                <input className='h-8 p-2 mb-3 focus:outline-none' name='endwork' type='text' id='endwork' pattern='^\d{4}$'
                placeholder='YYYY'
                value = {singleWork.endwork}
                onChange={(e) => handlechange(e, setWork, work, index)}
                />

                {work.length > 1 && (
                  <button type='button' className='remove-btn px-3 py-1 mb-3 rounded-sm border border-green-200 text-xs text-green-200' 
                  onClick={() => handleRemove(setWork,work,index)}> 
                    <span>Remove</span>
                  </button>
                )} 
              </div>
              
              {work.length - 1 === index && work.length < input_limit && (
                <div className='pb-5'>
                  <button className='add-btn px-3 py-1 rounded-sm border border-green-200 text-xs text-green-200' type='button' 
                  onClick={handleAddWork}>
                    Add Experience
                  </button>
                </div>
              )}
            </div>
          ))}

        {/* <h3 className='pb-3 font-bold text-2xl text-green-200'>Skill</h3>
        <div className='form-field'>
          <label htmlFor='skill'></label>
          {skillList.map((singleSkill, index) => (
            <div key={index} className='skills'>
              <input className='h-8 p-2 mb-3 mr-3 fpocus:outline-none' name='skill' type='text' id='skill' required 
              value = {singleSkill.skill}
              onChange={(e) => handlechange(e, setSkillList, skillList, index)}
              />
              
              {skillList.length > 1 && (
                <button type='button' className='remove-btn px-3 py-1 rounded-sm border border-green-200 text-xs text-green-200' onClick={() => handleRemove(setSkillList,skillList,index)}> 
                  <span>Remove</span>
                </button>
              )} 
              
              {skillList.length - 1 === index && skillList.length < input_limit*2 && (
                <div className='pb-10'>
                  <button className='add-btn px-3 py-1 rounded-sm border border-green-200 text-xs text-green-200' type='button' onClick={handleAddSkill}>
                    Add Skill
                  </button>
                </div>
              )}
            </div>
          ))}

        </div> */}

        <button className='px-3 py-1 rounded-sm bg-green-400' type='submit'>Save</button>
      
      </form>
      <Footer />
    </div>
  );
}

export default Profile;

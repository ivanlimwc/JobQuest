import React from "react";
import './SearchResults.css';

import { RiHandbagFill } from 'react-icons/ri'
import { VscChecklist } from 'react-icons/vsc'
import { LiaIndustrySolid } from 'react-icons/lia'
import { BsDot } from 'react-icons/bs'


export const SearchResults = ({ results }) => {
    let currSkill = []; 
  
    return (
        <div className='mt-3 results-list'>
            <div>
                {results.map((result,i)=>{ 
                    let currJob = result.job_id;
                    let job_url = ''
                    let job_title = ''
                    let company_link = ''
                    let company_name = ''
                    let job_location = ''
                    let posted_date = ''
                    let employment_type = ''
                    let job_seniority = ''
                    let job_function = ''
                    let industry = ''
                    let skills = []

                    currSkill.push(result.skill_name)
                    if(i != results.length-1){
                        if(results[i+1].job_id != currJob){
                            job_url = result.job_url
                            job_title = result.job_title
                            company_link = result.company_link
                            company_name = result.company_name
                            job_location = result.job_location
                            posted_date = result.posted_date
                            employment_type = result.employment_type
                            job_seniority = result.job_seniority
                            job_function = result.job_function
                            industry = result.industry
                            skills = currSkill
                            currSkill = []
                        }
                    } else {
                        job_url = result.job_url
                        job_title = result.job_title
                        company_link = result.company_link
                        company_name = result.company_name
                        job_location = result.job_location
                        posted_date = result.posted_date
                        employment_type = result.employment_type
                        job_seniority = result.job_seniority
                        job_function = result.job_function
                        industry = result.industry
                        skills = currSkill
                        currSkill = []
                    }
                    
                    let skills_final = skills.join(", ");
                    {if (job_title != '') return <div className="mb-3">
                            <a className="font-bold text-xl text-cyan-700" href={job_url} target="_blank" rel="noreferrer">{job_title}</a>
                            <span className="info-wrapper">
                                <a className='text-cyan-700' href={company_link} target="_blank" rel="noreferrer">{company_name}</a> 
                                <BsDot /> 
                                {job_location} 
                                <span className="ml-1 text-gray-400">posted on {posted_date}</span>
                            </span>
                            <div className="info-wrapper">
                                <RiHandbagFill className="mr-2" id='handbag' size={20} />
                                {employment_type} <BsDot /> {job_seniority}
                            </div>
                            
                            <div className="info-wrapper">
                                <LiaIndustrySolid className="mr-2" id='industry' size={20} />
                                {job_function} <BsDot /> {industry} 
                            </div>

                            {skills_final.length > 0 && (
                                <div className="info-wrapper">
                                    <VscChecklist id='checklist' size={20} />
                                    <div className="ml-2">Skills: {skills_final}</div>
                                </div>
                            )}
                        </div>
                    }
                })}
            </div>           
       
        </div>
    )
}
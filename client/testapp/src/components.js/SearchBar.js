import React, { useState } from "react";
import { FaSearch, FaSleigh } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import Select from 'react-select';
import {components} from 'react-select'
import { skills } from "./skills.ts";
import './SearchBar.css'

export const SearchBar = ({setSearches}) => {
    const [jobInput, setJobInput] = useState('');
    const [locInput, setLocInput] = useState(null);
    const [pdValue, setpdValue] = useState(null); //posted date
    const [elValue, setelValue] = useState(null); //experience level
    const [etValue, setetValue] = useState(null); //employment type
    const [skillValue, setskillValue] = useState([])

    const submitHandler = e => {
        e.preventDefault()
        setSearches({job:jobInput, location:locInput, postedDate: pdValue, experience: elValue, type: etValue, skills: skillValue})
      }

    const handleChange = (set,event) => {
        set(event.target.value)
    }

    // Handle option selection
    const handleSelectChange = (set, selectedValues) => {
        set(selectedValues);
    };
    
    const Dropdown = ({label, value, options, onChange}) => {
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
                // <option value = '' disabled selected hidden>{label}</option>
                // {options.map((option)=>
                //     <option value={option.value}>{option.label}</option>
                // )}
            />
        )
    }

    const selectStyles = {
        SelectContainer: baseStyles => ({
            marginRight: '20px',
            color: 'green',

        }),
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

    const skillOptions = skills;
    
    const Option = props => { 
        return ( 
        <div> 
            <components.Option {...props}> 
            <input type="checkbox" checked={props.isSelected} onChange={() => null} /> 
            <label>{props.value}</label> 
            </components.Option>
        </div> 
        ); 
    };
    console.log(skillValue)

    return (
        <div className='App' onSubmit={submitHandler}>
            <form className='grid grid-cols-3 gap-3'>
                <div className='input-wrapper'>
                    <FaSearch id='search-icon' size={25} />
                    <input className='text-lg w-full ml-3 focus:outline-none' placeholder='Search for job' required 
                    value={jobInput} 
                    onChange={(e) => handleChange(setJobInput,e)}
                    />
                </div>

                <div className='input-wrapper'>
                    <FaLocationDot id='location-icon' size={25} />
                    <input className='text-lg w-full ml-3 focus:outline-none' placeholder='Location' 
                    value={locInput} 
                    onChange={(e) => handleChange(setLocInput,e)}
                    />
                </div>

                <button className='h-8 w-20 rounded-xl border border-green-200 text-lg text-green-200' type='submit'>
                    search
                </button>
            </form>

            <div className='flex justify-left gap-3'>
                <Dropdown
                    label='Date posted' 
                    options={[
                        {label: 'Anytime', value:'Anytime'},
                        {label: 'Past month', value:'Past month'},
                        {label: 'Past week', value:'Past week'},
                        {label: 'Past 24 hours', value:'Past 24 hours'},
                    ]} 
                    value={pdValue} 
                    onChange={(e) => handleSelectChange(setpdValue, e)}/>
                
                {/* <div style={{width: '200px'}}> */}
                <Dropdown 
                    label='Experience level'
                    options={[
                        {label: 'Internship', value:'Internship'},
                        {label: 'Entry level', value:'Entry level'},
                        {label: 'Associate', value:'Associate'},
                        {label: 'Mid-Seniority', value:'Mid-Seniority'},
                        {label: 'Director', value:'Director'},
                        {label: 'Executive', value:'Executive'},
                        {label: 'Contract', value:'Contract'},
                        {label: 'Full-time', value:'Full-time'},
                    ]}
                    value={elValue}
                    onChange={(e) => handleSelectChange(setelValue, e)}/>
                {/* </div> */}
                {/* <div style={{width: '200px'}}> */}
                    <Dropdown 
                        label='Employment type'
                        options={[
                            {label: 'Internship', value:'Internship'},
                            {label: 'Full-time', value:'Full-time'},
                            {label: 'Contract', value:'Contract'},
                            {label: 'Part-time', value:'Part-time'},
                            {label: 'Temporary', value:'Temporary'},
                            {label: 'Other', value:'Other'},
                        ]}
                        value={etValue}
                        onChange={(e) => handleSelectChange(setetValue, e)}/>
                {/* </div> */}
                
                
                <div style={{width: '200px'}}>
                    <Select
                        styles={selectStyles}
                        components={{ Option }}
                        isMulti closeMenuOnSelect={false} 
                        closeMenuOnScroll={false}
                        hideSelectedOptions={false}
                        controlShouldRenderValue = {false}
                        menuPlacement="auto"
                        menuPosition="fixed"
                        placeholder = 'Skills'
                        options={skillOptions} 
                        value={skillValue}
                        onChange={(e)=>handleSelectChange(setskillValue,e)}
                    />
                </div>
                
                 

            </div>
        </div>
        
    );
};
import axios from 'axios';
import {useState} from 'react';
import Footer from '../Footer.js';
import { SearchBar } from '../components.js/SearchBar.js';
import { SearchResults } from '../components.js/SearchResults.js';
import {Link} from 'react-router-dom'

// import './App.css';

function Job() {

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [search0, setSearch0] = useState('');
 
  if (search){
    axios.post('http://localhost:8080/job',search)
    .then((res) => {
      console.log(res)
      setSearch('')

      if (res.data.message) {
        setSearch0(res.data.message) // nothing found
      } 
      else {
        setSearchResults(res.data)
        setSearch0('')
      }

    })
  }
  

  return (
    <div className="App">
       <div className='search-bar-container'>
        <SearchBar setSearches={setSearch}/>
        {search0 === '' && (
            <SearchResults results={searchResults} />
        )}
        {search0 !='' && (
            <div className='mt-3 p-3 text-white'>{search0}</div>
        )}  
       </div>

        <Footer />
    </div>
  );
}

export default Job;

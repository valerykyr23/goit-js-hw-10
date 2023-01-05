import './css/styles.css';

import _debounce from "lodash.debounce";

import Notiflix from 'notiflix';
Notiflix.Notify.init({ cssAnimationStyle: "zoom", fontAwesomeIconStyle: "shadow" });

const DEBOUNCE_DELAY = 300;


const refs = {

    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    container: document.querySelector(".country-info")
}




refs.input.addEventListener("input", _debounce(onSearch, DEBOUNCE_DELAY ));

function onSearch(event) {
    
    const inputValue = event.target.value;
    console.log(inputValue);
   

    fetchCountries(inputValue)
        .then(data => onSuccess(data))
        .catch(error => callError(error));
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            
        if (!response.ok) {
     throw new Error(response.statusText)
        }

        return response.json();
})
}


function callError () { 
Notiflix.Notify.failure("Oops, there is no country with that name");
}


function onSuccess(obj) {

    let c = obj[0];

    if (obj.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
    }
    
    const markup = obj.map(obj => `<li><img src="${c.flags.svg}" alt="Country flag" width="30" >
    <h2>${c.name.official}</h2>
    <h3>Capital: ${c.capital}</h3>
    <h4>Population: ${c.population}</h4>
    <span>Languages: ${Object.values(c.languages)}</span>
    </li>`)

    refs.list.innerHTML = markup.join("");
}


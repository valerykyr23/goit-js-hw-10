import './css/styles.css';

import _debounce from "lodash.debounce";

import Notiflix from 'notiflix';
Notiflix.Notify.init({ cssAnimationStyle: "zoom", fontAwesomeIconStyle: "shadow" });


import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;


const refs = {

    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    container: document.querySelector(".country-info")
}

let inputValue = "";
 



refs.input.addEventListener("input", _debounce(onSearch, DEBOUNCE_DELAY ));

function onSearch(event) {
    
    inputValue = event.target.value.trim();

    console.log(inputValue)
    
    if (inputValue === "") {
        clearMarkup();

        return;
    }

     else {
        fetchCountries(inputValue)
            .then(data => {

                console.log(data)
                if (data.length  === 1) {
                    clearMarkup();
                    
                    addToListAndDiv(data);
                    Notiflix.Notify.success('Here is your result.');
                }
                else if (data.length < 10 && data.length > 1) {
                    clearMarkup();
                    
                    addToList(data);
                    Notiflix.Notify.success('Here is your results.');
                }
                else  {
                    clearMarkup();
                    
                    return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
                }
            })
            .catch(error => {

                clearMarkup();

            callError(error)});
    }
    
}
   


function callError (error) { 
Notiflix.Notify.failure("Oops, there is no country with that name");
}


function addToList(obj) {
    
    

    const markup = obj.map(obj => `<li class="country-list--item">
            <img src="${obj.flags.svg}" alt="Country flag" width="40", height="30">
            <span style="margin-left:10px;font-size:24px;font-weight:400;">${obj.name.official}</span>
        </li>`).join("");

    refs.list.insertAdjacentHTML("beforeend", markup);
}


function addToListAndDiv(obj) {
    
    


    const countryInfo = obj.map(obj => `<div class="country-card">
        <div class="country-card--header">
            <img src="${obj.flags.svg}" alt="Country flag" width="55", height="55">
            <h2 style="margin-left:10px;"> ${obj.name.official}</h2>
        </div>
            <p style="font-size:24px;font-weight:bold;">Capital: <span style="font-size:20px;font-weight:400;">${obj.capital}</span></p>
            <p style="font-size:24px;font-weight:bold;">Population: <span style="font-size:20px;font-weight:400;">${obj.population}</span></p>
            <p style="font-size:24px;font-weight:bold;">Languages: <span style="font-size:20px;font-weight:400;">${Object.values(obj.languages)}</span></p>
    </div>`);
    refs.container.innerHTML = countryInfo.join("");


}




function clearMarkup () {

    refs.list.innerHTML = "";
    refs.container.innerHTML = "";
}




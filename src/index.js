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
    
    if (inputValue === "") {

        clearMarkup();

        return;
    }

     else {
        fetchCountries(inputValue)
            .then(data => {
                if (data.length === 1) {
                    clearMarkup();
                    
                    addToListAndDiv(data);
                    Notiflix.Notify.success('Here your result');
                }
                else if (data.length < 10 && data.length > 1) {
                    clearMarkup();
                    
                    addToList(data);
                    Notiflix.Notify.success('Here your results');
                }
                else if (data.length >= 10) {
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
    
    let c = obj[0];

    const markup = obj.map(obj => `<li class="">
            <img src="${c.flags.svg}" alt="Country flag" width="40", height="30">
            <span class="">${c.name.official}</span>
        </li>`).join("");

    refs.list.insertAdjacentHTML("beforeend", markup);
}


function addToListAndDiv(obj) {
    
    let c = obj[0];


    const countryInfo = obj.map(obj => `<div class="">
        <div class="">
            <img src="${c.flags.svg}" alt="Country flag" width="55", height="35">
            <h2 class=""> ${c.name.official}</h2>
        </div>
            <p class="">Capital: <span class="">${c.capital}</span></p>
            <p class="">Population: <span class="">${c.population}</span></p>
            <p class="">Languages: <span class="">${Object.values(c.languages)}</span></p>
    </div>`);
    refs.container.innerHTML = countryInfo.join("");


}



function clearMarkup () {

    refs.list.innerHTML = "";
    refs.container.innerHTML = "";
}
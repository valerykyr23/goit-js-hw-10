import './css/styles.css';

import _debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;


const refs = {

    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    container: document.querySelector(".country-info")
}




refs.input.addEventListener("input", _debounce(onSearch, DEBOUNCE_DELAY ));

function onSearch(event) {
    
    const inputValue = event.target.value;
    fetchCountries(inputValue)
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {

        console.log(response);

        if (!response.ok) {
     throw new Error(response.statusText)
        }

        return response.json();
})
}





const searchButton = document.getElementById('search-button')
const resultsContainer = document.querySelector('.results-container')
const state_input = document.getElementById('state_input')
const incident_input = document.getElementById('incident_input')

// required elements for autocomplete search
let stateSuggestions = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'IllinoisIndiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'MontanaNebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'PennsylvaniaRhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
]
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocomplete");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
// JS for autocomplete search
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = stateSuggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

    
const getDisaster = async () => {
    // incident_input.forEach(incident_input => incident_input.value = '')
    // state_input.forEach(state_input => state_input.value = '')

    const states = state_input.value
    const incidents = incident_input.value
    const apiUrl = `https://www.fema.gov/api/open/v1/FemaWebDisasterDeclarations?`

    const apiData = await fetch(apiUrl)
    const jsonData = await apiData.json()
    const disasterResults = jsonData.FemaWebDisasterDeclarations


    let resultsToDisplay = disasterResults.filter( result => result.stateName === states && result.incidentType == incidents)
    console.log(resultsToDisplay)

    resultsContainer.innerText = ''

    for (let disasterName of resultsToDisplay) {
        const name = disasterName.disasterName
        const incident = disasterName.incidentType
        const state = disasterName.stateName
        const date = disasterName.declarationDate

        const resultInfo = document.createElement('div')
        resultInfo.className = 'result-item'
        resultInfo.innerHTML = 
        `<h3>${incident} in ${state} </h3>
         <p>${name.toLowerCase()}</p>
         <p>Declared on: ${date}</p>
         `
    
         resultsContainer.append(resultInfo)
    }

    if(resultsToDisplay.length == 0) {
        console.log('no results')
        const noResults = document.createElement('div')
        noResults.className = 'no-results'
        noResults.innerHTML = 
        `<p>No results found. Please adjust your search.</p>
        `

        resultsContainer.append(noResults)
    }
}

searchButton.addEventListener('click', getDisaster)



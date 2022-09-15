const missionButton = document.getElementById('mission-submit')
const contactBtn = document.querySelector('.contact-submit')
const missionResultContainer = document.querySelector('.result_container')
const form2 = document.querySelector('.contact-form')


function handleContactRequest (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const stringified = stringifyFormData(data);
    doContactRequest(stringified);
  }

async function doContactRequest (body) {
    const result = await fetch('/contactUs', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
    const data = await result.json()
    if(data.isAlert) {
        alert(data.message)
    }
  }

form2.addEventListener('submit', handleContactRequest)


const getMission = async () => {
    const apiData = await fetch('https://www.fema.gov/api/open/v2/FemaRegions')
    const jsonData = await apiData.json()
    const femaResults = jsonData.FemaRegions

    missionResultContainer.innerText = ''

    for (let location of femaResults) {
        const name_ = location.name 
        const city_ = location.city
        const state_ = location.state
        const states_ = location.states

        const missionResultItem = document.createElement('div')
        missionResultItem.className = 'mission-result-item'
        missionResultItem.innerHTML = 
        `<h3>${city_}, ${state_}</h3>
        <p>${name_}</p>
        <p>Serves the following states: ${states_}</p>`

    missionResultContainer.append(missionResultItem)
    }
}


missionButton.addEventListener('click', getMission)


//window.location.pathname.indexOf('search') > -1

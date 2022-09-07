const searchButton = document.getElementById('search-button')
const resultsContainer = document.querySelector('.results-container')



const getDisaster = async () => {
    const apiData = await fetch('https://www.fema.gov/api/open/v1/FemaWebDisasterDeclarations')
    const jsonData = await apiData.json()
    const disasterResults = jsonData.FemaWebDisasterDeclarations

    resultsContainer.innerText = ''

    for (let disasterName of disasterResults) {
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
}

searchButton.addEventListener('click', getDisaster)



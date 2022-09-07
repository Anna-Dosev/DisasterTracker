const missionButton = document.getElementById('mission-submit')
const missionResultContainer = document.querySelector('.result_container')

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

// const getMission = async () => {
//     const apiData = await fetch('https://www.fema.gov/api/open/v1/MissionAssignments')
//     const jsonData = await apiData.json()
//     const missionResults = jsonData.MissionAssignments

//     missionResultContainer.innerText = ''

//     for (let mission of missionResults) {
//         const city_ = mission.city
//         const state = mission.stateorTribe
//         const agency_ = mission.agency
//         const totCost = mission.requestedAmount
//         const incident = mission.disasterDescription
//         const completed = mission.projectedCompletionDate

//         const missionResultItem = document.createElement('div')
//         missionResultItem.className = 'mission-result-item'
//         missionResultItem.innerHTML = 
//         `<h3>${city_}, ${state}</h3>
//         <p>${incident}</p>
//         <p>$${totCost}</p>
//         <p>${completed}</p>
//         `

//          missionResultContainer.append(missionResultItem)
//     }
// }

missionButton.addEventListener('click', getMission)




fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {

        //VARIABLES
        let events = data.events;
        let input = document.getElementById('searchInput')
        let checkboxesContainer = document.getElementById('filters')
        let upcomingEvents = []

        // DATE FILTER
        for (let i = 0; i < events.length; i++) {
            if (events[i].date > data.currentDate) {
                upcomingEvents.push(data.events[i])
            }

        //FUNCTION CALLS
        paintCards(upcomingEvents);
        paintCheckboxes(upcomingEvents);
        categoryFilter(upcomingEvents);

        //SEARCH BY TEXT
        input.addEventListener('input', () => {
            let filteredArray = textFilter(upcomingEvents, input.value)
            let filteredArray2 = categoryFilter(filteredArray)
            paintCards(filteredArray2)
        })

        //SEARCH BY CHECKBOXES
        checkboxesContainer.addEventListener('change', () => {
            let filteredArray = textFilter(upcomingEvents, input.value)
            let filteredArray2 = categoryFilter(filteredArray)
            paintCards(filteredArray2)
        })

    }})

    //FUNCTIONS

function paintCards(dataArray) {
    if (dataArray.length == 0) {
        cardsContainer.innerHTML = "<h3>No results for your search!</h3>"
        return
    }
    let cardTemplate = ""
    for (let i = 0; i < dataArray.length; i++) {
        cardTemplate += `
 <div class="card">
            <img src="${dataArray[i].image}" alt="${dataArray[i].name}" class="imagenNormal">
            <h3> ${dataArray[i].name} </h3>
            <p> ${dataArray[i].date} </p>
            <p> ${dataArray[i].description} </p>

            <div class="cardFooter">
                <h4>Price:$ ${dataArray[i].price} </h4>
               <a href="./details.html?id=${dataArray[i]._id}"> <button>See more</button></a>
            </div>
        </div>
 `
    }
    let cardsElement = document.getElementById("cardsContainer")

    cardsElement.innerHTML = cardTemplate

}

function paintCheckboxes(dataArray) {

    let categories = []

    for (let i = 0; i < dataArray.length; i++) {
        categories.push(dataArray[i].category)
    }

    const uniqueCategories = []

    categories.forEach((category) => {

        if (!uniqueCategories.includes(category)) {
            uniqueCategories.push(category);
        }
    })

    uniqueCategories.sort((a, b) => {
        if (a > b) {
            return 1
        }
        if (a < b) {
            return -1
        }
        return 0
    })

    let filterCheckbox = ""
    for (let i = 0; i < uniqueCategories.length; i++) {
        filterCheckbox += `
<input type="checkbox" class="checkboxes" id="${uniqueCategories[i]}" value="${uniqueCategories[i]}">
            <label for="${uniqueCategories[i]}">${uniqueCategories[i]}</label>
`
    }

    let checkboxElement = document.getElementById("filters")

    checkboxElement.innerHTML = filterCheckbox

}

function textFilter(dataArray, text) {
    let filteredArray = dataArray.filter(element => element.name.toLowerCase().includes(text.toLowerCase()))
    return filteredArray
}

function categoryFilter(dataArray) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayCheckeds = arrayChecks.filter(checkbox => checkbox.checked)
    if (arrayCheckeds.length == 0) {
        return dataArray
    }
    let checkedValues = arrayCheckeds.map(checkbox => checkbox.value)
    let arrayFilter = dataArray.filter(element => checkedValues.includes(element.category))
    return arrayFilter
}

const events = []
const pastEvents = []

for (const name of data.events) {
    events.push(name)
}

for (let i = 0; i < events.length; i++) {
    if (events[i].date < data.currentDate) {
        pastEvents.push(data.events[i])
    }

}

let cardTemplate = ""

for (let i = 0; i < pastEvents.length; i++) {
    cardTemplate += `
 <div class="card">
            <img src="${pastEvents[i].image}" alt="${pastEvents[i].name}" class="imagenNormal">
            <h3> ${pastEvents[i].name} </h3>
            <p> ${pastEvents[i].date} </p>
            <p> ${pastEvents[i].description} </p>
            <div class="cardFooter">
                <h4>Price:$ ${pastEvents[i].price} </h4>
                <button>See more</button>
            </div>
        </div>
 `
}

let cardsElement = document.getElementById("cardsContainer")

let containerContent = cardsElement.innerHTML = cardTemplate


// CHECKBOXES

const categories = []

for (let i = 0; i < events.length; i++) {
    categories.push(events[i].category)

}

const uniqueCategories = []

categories.forEach((category) => {

    if (!uniqueCategories.includes(category)) {
        uniqueCategories.push(category);
    }
})

uniqueCategories.sort()

let filterCheckbox = ""
for (let i = 0; i < uniqueCategories.length; i++) {
filterCheckbox += `
<input type="checkbox" id="${uniqueCategories[i]}" name="${uniqueCategories[i]}" value="${uniqueCategories[i]}">
            <label for="${uniqueCategories[i]}">${uniqueCategories[i]}</label>
`
}

let checkboxElement = document.getElementById("filters")

let filtersContent = checkboxElement.innerHTML = filterCheckbox
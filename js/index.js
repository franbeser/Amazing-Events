
const events = []

for (const name of data.events) {
    events.push(name)
}


// CARDS

let cardTemplate = ""

for (let i = 0; i < events.length; i++) {
    cardTemplate += `
 <div class="card">
            <img src="${events[i].image}" alt="${events[i].name}" class="imagenNormal">
            <h3> ${events[i].name} </h3>
            <p> ${events[i].date} </p>
            <p> ${events[i].description} </p>

            <div class="cardFooter">
                <h4>Price:$ ${events[i].price} </h4>
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

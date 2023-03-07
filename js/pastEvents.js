
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
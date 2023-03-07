const events = []
const upcomingEvents = []

for (const name of data.events) {
    events.push(name)
}

for (let i = 0; i < events.length; i++) {
    if (events[i].date > data.currentDate) {
        upcomingEvents.push(data.events[i])
    }

}

let cardTemplate = ""
for (let i = 0; i < upcomingEvents.length; i++) {
    cardTemplate += `
 <div class="card">
            <img src="${upcomingEvents[i].image}" alt="${upcomingEvents[i].name}" class="imagenNormal">
            <h3> ${upcomingEvents[i].name} </h3>
            <p> ${upcomingEvents[i].date} </p>
            <p> ${upcomingEvents[i].description} </p>
            <div class="cardFooter">
                <h4>Price:$ ${upcomingEvents[i].price} </h4>
                <button>See more</button>
            </div>
        </div>
 `
}

let cardsElement = document.getElementById("cardsContainer")

let containerContent = cardsElement.innerHTML = cardTemplate
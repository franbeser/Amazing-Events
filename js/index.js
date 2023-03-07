
const events = []

for (const name of data.events) {
    events.push(name)
}

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




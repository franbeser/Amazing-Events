fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {

        let events = data.events;

        let upcomingEvents = []
        for (let i = 0; i < events.length; i++) {
            if (events[i].date > data.currentDate) {
                upcomingEvents.push(data.events[i])
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


            let categories = []
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

 }})



// const events = []
// const upcomingEvents = []

// for (const name of data.events) {
//     events.push(name)
// }

// for (let i = 0; i < events.length; i++) {
//     if (events[i].date > data.currentDate) {
//         upcomingEvents.push(data.events[i])
//     }

// }

// let cardTemplate = ""
// for (let i = 0; i < upcomingEvents.length; i++) {
//     cardTemplate += `
//  <div class="card">
//             <img src="${upcomingEvents[i].image}" alt="${upcomingEvents[i].name}" class="imagenNormal">
//             <h3> ${upcomingEvents[i].name} </h3>
//             <p> ${upcomingEvents[i].date} </p>
//             <p> ${upcomingEvents[i].description} </p>
//             <div class="cardFooter">
//                 <h4>Price:$ ${upcomingEvents[i].price} </h4>
//                 <button>See more</button>
//             </div>
//         </div>
//  `
// }

// let cardsElement = document.getElementById("cardsContainer")

// let containerContent = cardsElement.innerHTML = cardTemplate


// // CHECKBOXES

// const categories = []

// for (let i = 0; i < events.length; i++) {
//     categories.push(events[i].category)

// }

// const uniqueCategories = []

// categories.forEach((category) => {

//     if (!uniqueCategories.includes(category)) {
//         uniqueCategories.push(category);
//     }
// })

// uniqueCategories.sort()

// let filterCheckbox = ""
// for (let i = 0; i < uniqueCategories.length; i++) {
// filterCheckbox += `
// <input type="checkbox" id="${uniqueCategories[i]}" name="${uniqueCategories[i]}" value="${uniqueCategories[i]}">
//             <label for="${uniqueCategories[i]}">${uniqueCategories[i]}</label>
// `
// }

// let checkboxElement = document.getElementById("filters")

// let filtersContent = checkboxElement.innerHTML = filterCheckbox
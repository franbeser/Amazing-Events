fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {


        //VARIABLES
        let events = data.events
        let queryString = location.search
        let params = new URLSearchParams(queryString)
        let id = params.get("id")
        let event = events.find(element => element._id == id)
        let detailsContainer = document.getElementById('detailedInfo')

        //CARD CREATION
        detailsContainer.innerHTML = `
<div class="eventDetails">
        <div class="image">
            <img src="${event.image}" alt="${event.name}">
        </div>

        <div class="fullDetails">
            <div class="category" >
                <p class="cat, fw-bold" >#${event.category}</p>
            </div>
            <h3 class= "text-uppercase">${event.name}</h3>
            <p class="text-center">${event.description}</p>
            <p>Date: ${event.date}</p>
            <p class= "fst-italic">${event.place} (Capacity:${event.capacity})</p>
            <p>Price: $${event.price}</p>
        </div>
    </div>
`


    })

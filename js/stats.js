fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {


        //VARIABLES
        let events = data.events
        let pastEvents = []
        let upcomingEvents = []
        let pastEventsData = []
        let upcomingEventsData = []

        console.log(events);

        //DATE FILTERS
        for (let i = 0; i < events.length; i++) {
            if (events[i].date < data.currentDate) {
                pastEvents.push(data.events[i])
            }
        }
        for (let i = 0; i < events.length; i++) {
            if (events[i].date > data.currentDate) {
                upcomingEvents.push(data.events[i])
            }
        }

        //CREATE PROPERTIES
        for (let i = 0; i < pastEvents.length; i++) {
            pastEventsData.push({
                category: pastEvents[i].category,
                capacity: pastEvents[i].capacity,
                assistance: pastEvents[i].assistance,
                revenues: pastEvents[i].assistance * pastEvents[i].price
            })
        }
        for (let i = 0; i < upcomingEvents.length; i++) {
            upcomingEventsData.push({
                category: upcomingEvents[i].category,
                capacity: upcomingEvents[i].capacity,
                assistance: upcomingEvents[i].estimate,
                percentaje: (upcomingEvents[i].estimate * 100) / upcomingEvents[i].capacity,
                revenues: upcomingEvents[i].estimate * upcomingEvents[i].price
            })
        }


        //REDUCE
        let categoriesPast = pastEventsData.reduce((acc, cur) => {
            const category = cur.category;
            if (!acc[category]) {
                acc[category] = {
                    category: category,
                    capacity: 0,
                    assistance: 0,
                    revenues: 0
                };
            }
            acc[category].capacity += cur.capacity;
            acc[category].assistance += cur.assistance;
            acc[category].revenues += cur.revenues;
            return acc;
        }, {});
        let pastEventsStats = Object.values(categoriesPast);

        let categoriesUpc = upcomingEventsData.reduce((acc, cur) => {
            const category = cur.category;
            if (!acc[category]) {
                acc[category] = {
                    category: category,
                    capacity: 0,
                    assistance: 0,
                    revenues: 0
                };
            }
            acc[category].capacity += cur.capacity;
            acc[category].assistance += cur.assistance;
            acc[category].revenues += cur.revenues;
            return acc;
        }, {});
        let upcomingEventsStats = Object.values(categoriesUpc);


        //CREATE TABLE

        paintUpcStats(upcomingEventsStats);
        paintPastStats(pastEventsStats);

    })

function paintUpcStats(dataArray) {
    let tableTemplate = ""
    for (let i = 0; i < dataArray.length; i++) {
        tableTemplate += `
        <tr>
            <td>${dataArray[i].category}</td>
            <td>${dataArray[i].revenues}</td>
            <td>${((dataArray[i].assistance * 100) / dataArray[i].capacity).toFixed(2)}%</td>
        </tr>
        `
    }
    let upcomingContainer = document.getElementById("upcTable")
    upcomingContainer.innerHTML = tableTemplate
}

function paintPastStats(dataArray) {
    let tableTemplate = ""
    for (let i = 0; i < dataArray.length; i++) {
        tableTemplate += `
        <tr>
            <td>${dataArray[i].category}</td>
            <td>${dataArray[i].revenues}</td>
            <td>${((dataArray[i].assistance * 100) / dataArray[i].capacity).toFixed(2)}%</td>
        </tr>
        `
    }
    let upcomingContainer = document.getElementById("pastTable")
    upcomingContainer.innerHTML = tableTemplate
}
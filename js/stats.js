fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {


        //VARIABLES
        let events = data.events
        let pastEvents = []
        let upcomingEvents = []
        let pastEventsData = []
        let upcomingEventsData = []


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
                percentage: (upcomingEvents[i].estimate * 100) / upcomingEvents[i].capacity,
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


        //CREATE TABLES

        paintStats(upcomingEventsStats, "upcTable");
        paintStats(pastEventsStats, "pastTable");
        paintRecords(events, pastEvents, "records")

    })


    //FUNCTIONS

function paintStats(dataArray, containerID) {
    let tableTemplate = ""
    for (let i = 0; i < dataArray.length; i++) {
        tableTemplate += `
        <tr>
            <td>${dataArray[i].category}</td>
            <td>$${dataArray[i].revenues}</td>
            <td>${((dataArray[i].assistance * 100) / dataArray[i].capacity).toFixed(2)}%</td>
        </tr>
        `
    }
    let statsContainer = document.getElementById(containerID)
    statsContainer.innerHTML = tableTemplate
}

function paintRecords(dataArray, dataArray2, containerID) {

    //VARIABLES
    let maxCap = 0;
    let maxCapacityEvent = {};
    let maxPct = 0;
    let maxPercentageEvent = {};
    let minPct = 100;
    let minPercentageEvent = {};

    //SEARCH
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].capacity > maxCap) {
            maxCap = dataArray[i].capacity;
            maxCapacityEvent = dataArray[i];
        }
    }
    for (var i = 0; i < dataArray2.length; i++) {
        if ((((dataArray2[i].assistance) * 100) / dataArray2[i].capacity) < minPct) {
            minPct = (((dataArray2[i].assistance) * 100) / dataArray2[i].capacity);
            minPercentageEvent = dataArray2[i];
        }
    }
    for (var i = 0; i < dataArray2.length; i++) {
        if ((((dataArray2[i].assistance) * 100) / dataArray2[i].capacity) > maxPct) {
            maxPct = (((dataArray2[i].assistance) * 100) / dataArray2[i].capacity);
            maxPercentageEvent = dataArray2[i];
        }
    }

    //CREATE TABLE
    let tableTemplate = ""
    tableTemplate += `
        <tr>
            <td>${maxPercentageEvent.name} (${(((maxPercentageEvent.assistance) * 100) / maxPercentageEvent.capacity).toFixed(2)}%)</td>
            <td>${minPercentageEvent.name} (${(((minPercentageEvent.assistance) * 100) / minPercentageEvent.capacity).toFixed(2)}%)</td>
            <td>${maxCapacityEvent.name} (${maxCapacityEvent.capacity})</td>
        </tr>
        `
    let statsContainer = document.getElementById(containerID)
    statsContainer.innerHTML = tableTemplate
}




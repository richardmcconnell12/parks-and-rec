let parksContainer = document.querySelector(".parks_container");

fetch("https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json")
    .then(response => response.json())
    .then(parsedParks => {
        const allParks = parsedParks.parks;
        console.log("parks", allParks);
        allParks.forEach(park => {
            fetch(`https://api.darksky.net/forecast/2f096b978a4113e0a252972b4a504ccf/${park.latitude},${park.longitude}`)
            .then(response => response.json())
            .then(parsedSummaries => {
                const currently = parsedSummaries.currently.summary
                const hourly = parsedSummaries.hourly.summary
                const daily = parsedSummaries.daily.summary
                const allWeather = parsedSummaries.currently.summary;
                console.log(allWeather)

            const parkHtml = `
                <article class="park_visited_${park.visited}">
                <h3>${park.name}</h3>
                <p>${park.state}</p>
                <ul>
                <li>Currently: ${currently}</li>
                <li>Today: ${hourly}</li>
                <li>Week: ${daily}</li>
                </ul>
                </article>`;

            parksContainer.innerHTML += parkHtml
        })
    });
});

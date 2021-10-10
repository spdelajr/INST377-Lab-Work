async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  const request = await fetch(endpoint);
  const cities = await request.json();
  /* fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => { cities.push(...data); }); */
  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.city.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
    console.log(matchArray);
    const html = matchArray.map((place) => {
      return `
          <li>
            <span class = 'name'>${place.name} <br/>${place.category} <em><br/>${place.address_line_1} <br/>${place.city} <br/>${place.zip}</em></span>
          </li>
        `;
    }).join('');
    console.log(html);
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('change', (evt) => { displayMatches(evt); });
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });

  let mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
}
window.onload = windowActions;
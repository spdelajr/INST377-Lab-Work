async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  const request = await fetch(endpoint);
  const cities = await request.json();
  let mapX = 0;
  let mapY = 0;
  let mymap = L.map('mapid').setView([mapX, mapY], 13);
  /* fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => { cities.push(...data); }); */
  function findMatches(wordToMatch, cities) {
    console.log(wordToMatch.length);
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
    const finalFive = matchArray.slice(0, 5);
    console.log(finalFive);
    const html = finalFive.map((place) => {
      return `
          <li>
            <span class = 'name'>${place.name} <br/>${place.category} <em><br/>${place.address_line_1} <br/>${place.city} <br/>${place.zip}</em></span>
          </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
  }

  function displayMap(event) {
    const matchArray = findMatches(event.target.value, cities);
    const finalFive = matchArray.slice(0, 5);
    console.log(finalFive);
    mapX = finalFive[0].geocoded_column_1.coordinates[1];
    mapY = finalFive[0].geocoded_column_1.coordinates[0];
    mymap = L.map('mapid').setView([mapX, mapY], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoic3BkZWxhanIiLCJhIjoiY2t1bGZuaXltMDBiZzJ1bGN1a2JtZGVnOSJ9.ZFtHmyCnSOxOXYtCbYoKzg'
    }).addTo(mymap);
    const marker1 = L.marker([mapX, mapY]).addTo(mymap);
    const marker2 = L.marker([finalFive[1].geocoded_column_1.coordinates[1], finalFive[1].geocoded_column_1.coordinates[0]]).addTo(mymap);
    const marker3 = L.marker([finalFive[2].geocoded_column_1.coordinates[1], finalFive[2].geocoded_column_1.coordinates[0]]).addTo(mymap);
    const marker4 = L.marker([finalFive[3].geocoded_column_1.coordinates[1], finalFive[3].geocoded_column_1.coordinates[0]]).addTo(mymap);
    const marker5 = L.marker([finalFive[4].geocoded_column_1.coordinates[1], finalFive[4].geocoded_column_1.coordinates[0]]).addTo(mymap);
  }

  //searchInput.addEventListener('change', (evt) => { displayMatches(evt); });
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt); });
  //searchInput.addEventListener('change', (evt) => { displayMap(evt); });
  searchInput.addEventListener('keyup', (evt) => {
    mymap.remove();
    displayMap(evt); });
  console.log(searchInput.length);
}
window.onload = windowActions;
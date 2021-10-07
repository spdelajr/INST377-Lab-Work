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
      return place.name.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
    console.log(matchArray);
    const html = matchArray.map((place) => {
      return `
    <li>
      <span class = 'name'>${place.name}, ${place.city}, ${place.state}</span>
    </li>
    `;
    }).join('');
    console.log(html);
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('change', (evt) => { displayMatches(evt); });
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}
window.onload = windowActions;
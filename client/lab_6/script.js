const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => { cities.push(...data); });
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
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

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
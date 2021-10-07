const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => { cities.push(...data); });
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex);
  });
}
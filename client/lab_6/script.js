const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => { console.log(data); });
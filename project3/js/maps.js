function findLocation(x, y) {
  //console.log(x, y);

  for (let i = 0; i < places.length; i++) {
    if (places[i].location[0] === x && places[i].location[1] === y) {
      return i;
    }
  }

  return -1;
}

function showLocation(e) {
  //console.log("You clicked " + e.latlng.lat + " and " + e.latlng.lng);

  let idx = findLocation(e.latlng.lat, e.latlng.lng);
  if (idx >= 0) {
    imgElem.src = places[idx].image;
    imgElem.alt = places[idx].title;
    review.innerHTML = places[idx].review;
  }
}

function setView() {
  places = JSON.parse(localStorage.getItem('places'));

  if (places) {
    for (var p of places) {
      var marker = L.marker(p.location)
        .addTo(myMap)
        .bindPopup(p.title);
      marker.on('click', showLocation);
    }
  }
}

// Initiate map
let myMap = L.map('map').setView([-6.218323, 106.801861], 15);
L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    attribution: '© <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken:
      'pk.eyJ1IjoieGVub205NyIsImEiOiJjam1ieGE1dHgwZ3hrM3BxaHgzbHM1Y3pnIn0.shs1EsTtM2VpD74GSZ648Q'
  }
).addTo(myMap);

// Get data
const URL = 'https://xenom97.github.io/project3/map.json';

// Fetch
fetch(URL)
  .then(function(response) {
    if (response.status !== 200) {
      console.log('There is a problem . Status Code: ' + response.status);
      throw response.statusText;
    }
    return response.json();
  })
  .then(resp => {
    localStorage.setItem('places', JSON.stringify(resp.places));
    setView();
  })
  .catch(function(err) {
    console.log(err);
  });

// Set view
let img = document.getElementById('image');
let review = document.getElementById('review');
let imgElem = document.createElement('img');
let places;

img.appendChild(imgElem);

setView();

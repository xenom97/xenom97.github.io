let lat = -6.218323;
let lng = 106.801861;

onMapClick = (e) => {
	popup.setLatLng(e.latlng)
	.setContent("Current position: " + e.latlng.toString())
	.openOn(mymap);
};

let mymap = L.map('mapid').setView([lat, lng], 14);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
	{
		attribution: '© <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 20,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoieGVub205NyIsImEiOiJjam1ieGE1dHgwZ3hrM3BxaHgzbHM1Y3pnIn0.shs1EsTtM2VpD74GSZ648Q'
	}).addTo(mymap);
mymap.on('click', onMapClick);

let marker = L.marker([lat, lng]).addTo(mymap);
marker.bindPopup("<b>Gelora Bung Karno Main Stadium</b><br>Jakarta, Indonesia").openPopup();

let circle = L.circle([lat, lng], {
	color: '#add8e6',
	fillColor: '#add8e6',
	fillOpacity: 0.5,
	radius: 100
}).addTo(mymap);

let popup = L.popup();
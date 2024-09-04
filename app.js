// Initialize the map
var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

// Add a tile layer (background map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Array to hold the coordinates with date and time
var locations = JSON.parse(localStorage.getItem('locations')) || [];

// Function to get current date and time
function getCurrentDateTime() {
    const now = new Date();
    return `${now.toISOString()}`;
}

// Function to add a marker on the map
function addMarker(lat, lng) {
    var marker = L.marker([lat, lng]).addTo(map);
    var dateTime = getCurrentDateTime();
    locations.push({ lat, lng, dateTime });
    localStorage.setItem('locations', JSON.stringify(locations));

    // Remove existing polyline if present
    if (map.hasLayer(polyline)) {
        map.removeLayer(polyline);
    }

    // Add polyline if there are more than 1 coordinates
    if (locations.length > 1) {
        const coords = locations.map(loc => [loc.lat, loc.lng]);
        polyline = L.polyline(coords, { color: 'blue' }).addTo(map);
    }
}

// Add existing markers and route from local storage
var polyline;
locations.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(map);
});
if (locations.length > 1) {
    const coords = locations.map(loc => [loc.lat, loc.lng]);
    polyline = L.polyline(coords, { color: 'blue' }).addTo(map);
}

document.getElementById('locationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var lat = parseFloat(document.getElementById('latitude').value);
    var lng = parseFloat(document.getElementById('longitude').value);

    if (!isNaN(lat) && !isNaN(lng)) {
        addMarker(lat, lng);
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
    } else {
        alert('Please enter valid coordinates.');
    }
});
function addMarker(lat, lng) {
    var dateTime = getCurrentDateTime();
    var marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(`Lat: ${lat}, Lng: ${lng}<br>Date & Time: ${dateTime}`)
        .openPopup();

    locations.push({ lat, lng, dateTime });
    localStorage.setItem('locations', JSON.stringify(locations));

    // Remove existing polyline if present
    if (map.hasLayer(polyline)) {
        map.removeLayer(polyline);
    }

    // Add polyline if there are more than 1 coordinates
    if (locations.length > 1) {
        const coords = locations.map(loc => [loc.lat, loc.lng]);
        polyline = L.polyline(coords, { color: 'blue' }).addTo(map);
    }
}
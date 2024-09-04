// script.js
async function getCoordinates() {
    const link = document.getElementById('mapLink').value.trim();
    const resultElement = document.getElementById('result');
    
    if (!link) {
        resultElement.innerText = 'Please enter a Google Maps link.';
        return;
    }

    try {
        // Fetch the redirected URL to handle short links
        const response = await fetch(link, { method: 'HEAD', redirect: 'follow' });
        const finalUrl = response.url;
        
        // Extract coordinates from the URL
        const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const matches = finalUrl.match(regex);
        
        if (matches) {
            const latitude = matches[1];
            const longitude = matches[2];
            resultElement.innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
        } else {
            resultElement.innerText = 'Coordinates not found in the URL.';
        }
    } catch (error) {
        console.error('Error fetching the URL:', error);
        resultElement.innerText = 'Error fetching the URL. Please check the link.';
    }
}
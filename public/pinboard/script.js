// Global variables
let map;
let pins = [];
let currentClickLatLng = null;

// Initialize map
function initMap() {
    map = L.map('map', {
        maxBounds: [
            [-90, -180], // Southwest corner
            [90, 180]    // Northeast corner
        ],
        maxBoundsViscosity: 1.0, // Prevent dragging beyond bounds
        worldCopyJump: false     // Prevent infinite scrolling
    }).setView([20, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        noWrap: true // Prevent tile wrapping
    }).addTo(map);
    
    // Add click event to map
    map.on('click', onMapClick);
    
    // Load existing pins
    loadPins();
}

// Handle map click
function onMapClick(e) {
    currentClickLatLng = e.latlng;
    document.getElementById('pin-modal').style.display = 'block';
}

// Load pins from server
async function loadPins() {
    try {
        const response = await fetch('/api/pins');
        pins = await response.json();
        displayPins();
        updatePinCount();
    } catch (error) {
        console.error('Error loading pins:', error);
    }
}

// Display pins on map
function displayPins() {
    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    
    // Add pins
    pins.forEach(pin => {
        const pinColor = pin.color || '#ff4757'; // Default to red if no color
        const marker = L.marker([pin.lat, pin.lng], {
            icon: L.divIcon({
                className: 'custom-pin',
                html: `<div style="background-color: ${pinColor}; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); cursor: pointer; transition: transform 0.2s;"></div>`,
                iconSize: [20, 20]
            })
        });
        
        marker.on('click', () => showPinInfo(pin));
        marker.addTo(map);
    });
}

// Show pin information
function showPinInfo(pin) {
    const infoDiv = document.getElementById('pin-info');
    const date = new Date(pin.timestamp).toLocaleDateString();
    
    infoDiv.innerHTML = `
        <div class="pin-info-item">
            <strong>Name:</strong> ${pin.name}
        </div>
        ${pin.message ? `
        <div class="pin-info-item">
            <strong>Message:</strong> ${pin.message}
        </div>
        ` : ''}
        <div class="pin-info-item">
            <strong>Date:</strong> ${date}
        </div>
    `;
    
    document.getElementById('info-modal').style.display = 'block';
}

// Add new pin
async function addPin(name, message, color) {
    try {
        const response = await fetch('/api/pins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: currentClickLatLng.lat,
                lng: currentClickLatLng.lng,
                name: name,
                message: message,
                color: color
            })
        });
        
        if (response.ok) {
            const newPin = await response.json();
            pins.push(newPin);
            displayPins();
            updatePinCount();
            closeModal('pin-modal');
            clearForm();
        } else {
            alert('Error adding pin. Please try again.');
        }
    } catch (error) {
        console.error('Error adding pin:', error);
        alert('Error adding pin. Please try again.');
    }
}

// Update pin count
function updatePinCount() {
    document.getElementById('pin-count').textContent = pins.length;
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Clear form
function clearForm() {
    document.getElementById('visitor-name').value = '';
    document.getElementById('visitor-message').value = '';
    // Reset color to red (default)
    document.getElementById('color-red').checked = true;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    
    // Pin form submission
    document.getElementById('pin-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('visitor-name').value.trim();
        const message = document.getElementById('visitor-message').value.trim();
        const color = document.querySelector('input[name="pin-color"]:checked').value;
        addPin(name, message, color);
    });
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});

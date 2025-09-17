'use client';
import { useEffect } from 'react';

export default function PinboardPage() {
  useEffect(() => {
    // Load the pinboard script after component mounts
    const script = document.createElement('script');
    script.src = '/pinboard/script.js';
    script.async = true;
    document.body.appendChild(script);

    // Load Leaflet CSS and JS
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCSS);

    const leafletJS = document.createElement('script');
    leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletJS.async = true;
    document.body.appendChild(leafletJS);

    // Load pinboard CSS
    const pinboardCSS = document.createElement('link');
    pinboardCSS.rel = 'stylesheet';
    pinboardCSS.href = '/pinboard/style.css';
    document.head.appendChild(pinboardCSS);

    return () => {
      // Cleanup
      document.body.removeChild(script);
      document.head.removeChild(leafletCSS);
      document.body.removeChild(leafletJS);
      document.head.removeChild(pinboardCSS);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            VISITOR PINBOARD
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Click anywhere on the map to add your pin and show where you&apos;re from!
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div id="map" className="w-full h-[500px] md:h-[600px]"></div>
        </div>
        
        <div className="text-center mt-6">
          <div className="inline-flex items-center px-6 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg">
            <span className="text-gray-700 dark:text-gray-300 mr-2">Total visitors:</span>
            <span id="pin-count" className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</span>
          </div>
        </div>
      </div>

      {/* Pin Modal */}
      <div id="pin-modal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h3>Add Your Pin</h3>
          <form id="pin-form">
            <input type="text" id="visitor-name" placeholder="Your name (optional)" />
            <textarea id="visitor-message" placeholder="Leave a message (optional)"></textarea>
            <div className="color-picker-container">
              <label htmlFor="pin-color">Choose pin color:</label>
              <div className="color-options">
                <input type="radio" id="color-red" name="pin-color" value="#ff4757" defaultChecked />
                <label htmlFor="color-red" className="color-option red" title="Red"></label>
                
                <input type="radio" id="color-blue" name="pin-color" value="#3742fa" />
                <label htmlFor="color-blue" className="color-option blue" title="Blue"></label>
                
                <input type="radio" id="color-green" name="pin-color" value="#2ed573" />
                <label htmlFor="color-green" className="color-option green" title="Green"></label>
                
                <input type="radio" id="color-purple" name="pin-color" value="#a55eea" />
                <label htmlFor="color-purple" className="color-option purple" title="Purple"></label>
                
                <input type="radio" id="color-orange" name="pin-color" value="#ffa502" />
                <label htmlFor="color-orange" className="color-option orange" title="Orange"></label>
                
                <input type="radio" id="color-pink" name="pin-color" value="#ff6b9d" />
                <label htmlFor="color-pink" className="color-option pink" title="Pink"></label>
              </div>
            </div>
            <button type="submit">Add Pin</button>
          </form>
        </div>
      </div>

      {/* Pin Info Modal */}
      <div id="info-modal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <div id="pin-info"></div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';

// Use require to import Mapbox GL
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const MapboxGLMap = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        // Set Mapbox access token
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

        // Initialize the Mapbox map
        const map = new mapboxgl.Map({
            container: mapContainerRef.current, // Reference to the container element
            style: 'mapbox://styles/mapbox/streets-v11', // Map style URL
            center: [2.3522, 48.8566], // Paris coordinates [lng, lat]
            zoom: 12, // Initial zoom level
        });

        map.on('load', () => {
            console.log('Map loaded successfully');
        });

        // Cleanup map instance on component unmount
        return () => {
            if (map) map.remove();
        };
    }, []);

    return (
        <div
            id="YOUR_CONTAINER_ELEMENT_ID"
            ref={mapContainerRef}
            style={{
                width: '100%',
                height: '100vh',
            }}
        />
    );
};

export default MapboxGLMap;

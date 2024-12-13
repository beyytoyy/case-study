import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL JS

// Import the uploaded GeoJSON file
import worldGeoJSON from './worldGeoJSON'; // Import Mapbox GL JS
// Import an image (e.g., a star or logo)
import customImage from '../assets/neil.jpg'; // Replace with your image path

const MapboxGLMap = () => {
    const mapContainerRef = useRef(null); // Reference for the map container

    useEffect(() => {
        // Set Mapbox access token
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

        // Initialize the Mapbox map with globe projection
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            projection: 'globe', // Globe projection
            style: 'mapbox://styles/mapbox/satellite-v9', // Use Mapbox satellite style
            center: [0, 0], // Center of the map
            zoom: 2, // Initial zoom level
        });

        // Generate random colors for each country
        const generateRandomColor = () => {
            return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        };

        // Create a color map for all countries in the GeoJSON
        const colorMap = {};
        worldGeoJSON.features.forEach(feature => {
            const countryCode = feature.properties.iso_a3; // Use ISO A3 code
            colorMap[countryCode] = generateRandomColor();
        });

        // Add the custom image when the style loads
        map.on('style.load', () => {
            // Add GeoJSON data as a source
            map.addSource('countries', {
                type: 'geojson',
                data: worldGeoJSON, // Use the uploaded GeoJSON data
            });

            // Add a layer to style the countries with random colors
            map.addLayer({
                id: 'country-layer',
                type: 'fill',
                source: 'countries',
                paint: {
                    'fill-color': [
                        'match',
                        ['get', 'iso_a3'], // Use the ISO A3 property to assign colors
                        ...Object.entries(colorMap).flat(),
                        '#000000', // Default color if no match is found
                    ],
                    'fill-opacity': 0.3, // Semi-transparent for satellite visibility
                },
            });

            // Load and add the custom image
            map.loadImage(customImage, (error, image) => {
                if (error) throw error;
                map.addImage('custom-star', image); // Add the image with a unique name

                // Add a symbol layer to place the image
                map.addSource('image-source', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [10, 20], // Replace with desired coordinates
                                },
                                properties: {},
                            },
                        ],
                    },
                });

                map.addLayer({
                    id: 'image-layer',
                    type: 'symbol',
                    source: 'image-source',
                    layout: {
                        'icon-image': 'custom-star', // Use the added image
                        'icon-size': 0.1, // Adjust size of the image
                    },
                });
            });

            // Add fog for the globe projection
            map.setFog({
                color: 'rgb(186, 210, 235)', // Lower atmosphere
                'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
                'horizon-blend': 0.02, // Atmosphere thickness
                'space-color': 'rgb(11, 11, 25)', // Background color
                'star-intensity': 0.6, // Background star brightness
            });
        });

        // Cleanup map instance on component unmount
        return () => {
            if (map) map.remove();
        };
    }, []);

    return (
        <div
            ref={mapContainerRef} // Reference to the DOM element for the map
            style={{
                width: '1400px', // Fixed width of the map
                height: '650px', // Fixed height of the map
            }}
        />
    );
};

export default MapboxGLMap;

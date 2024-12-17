import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox access token
if (!process.env.REACT_APP_MAPBOX_ACCESS_TOKEN) {
  console.error("Mapbox access token is missing. Please set REACT_APP_MAPBOX_ACCESS_TOKEN in your .env file.");
}
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const GeoJsonMap = () => {
  const mapContainerRef = useRef(null); // Ref for map container
  const mapRef = useRef(null); // Ref for storing the map instance

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      console.error("Mapbox access token is not set.");
      return; // Exit if no access token
    }

    // Initialize the Mapbox map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Reference to the map container
      style: "mapbox://styles/mapbox/outdoors-v12", // Map style URL
      center: [2.3522, 48.8566], // Initial map center (longitude, latitude)
      zoom: 1.5, // Initial zoom level
      pitch: 2, // Tilt for 3D effect
      bearing: -17.6, // Map rotation
      projection: "globe", // Globe projection
    });

    mapRef.current = map; // Store the map instance

    // Add fog to simulate atmospheric effects
    map.on("style.load", () => {
      map.setFog({
        color: "rgb(186, 210, 235)", // Lower atmosphere color
        "high-color": "rgb(36, 92, 223)", // Upper atmosphere color
        "horizon-blend": 0.02, // Thickness of the atmosphere
        "space-color": "rgb(11, 11, 25)", // Space background color
        "star-intensity": 0.6, // Star brightness
      });
    });

    map.on("load", () => {
      console.log("Map loaded successfully");

      // Add any additional map features or data here, if needed
    });

    // Resize handler to ensure the map resizes properly
    const handleResize = () => {
      map.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up on component unmount
      if (map) map.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "900px", // Full width of the container
        height: "500px", // Full viewport height
      }}
    />
  );
};

export default GeoJsonMap;

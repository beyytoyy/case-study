import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Dropdown } from 'primereact/dropdown';
import worldGeoJSON from './worldGeoJSON';

const MapboxGLMap = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [commodity, setCommodity] = useState(null);
    const [filteredCommodities, setFilteredCommodities] = useState([]);
    const [countryCommodities, setCountryCommodities] = useState([]);
    const [loadingCommodities, setLoadingCommodities] = useState(false);
    const [loadingPrices, setLoadingPrices] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const geoapifyKey = 'e74b1f122811458394c3facaa036106e';
    const appIdentifier = 'Sm9obiBNYXJrIEJvbG9uZ2FuOmpvaG5tYXJrYm9sb25nYW44QGdtYWlsLmNvbQ==';
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    useEffect(() => {
        const countries = worldGeoJSON.features.map((feature) => ({
            name: feature.properties.name,
            iso_a3: feature.properties.iso_a3,
            geometry: feature.geometry,
        }));
        setAllCountries(countries);
    }, []);

    const fetchAllCommodities = async () => {
        setLoadingCommodities(true);
        const limit = 100;
        let offset = 0;
        let fetchedCommodities = [];
        let hasMoreData = true;

        while (hasMoreData) {
            const response = await fetch(
                `https://hapi.humdata.org/api/v1/metadata/wfp-commodity?output_format=json&limit=${limit}&offset=${offset}&app_identifier=${appIdentifier}`
            );
            const data = await response.json();

            if (data.data.length > 0) {
                fetchedCommodities = [...fetchedCommodities, ...data.data];
                console.log(`Fetched ${data.data.length} commodities, total: ${fetchedCommodities.length}`);
                offset += limit;
            } else {
                hasMoreData = false;
            }
        }

        setFilteredCommodities(fetchedCommodities);
        setLoadingCommodities(false);
    };

    const fetchCountryCommodities = async (country) => {
        const limit = 1000;
        let offset = 0;
        let fetchedCommodities = [];
        let hasMoreData = true;

        while (hasMoreData) {
            const response = await fetch(
                `https://hapi.humdata.org/api/v1/food/food-price?output_format=json&limit=${limit}&offset=${offset}&app_identifier=${appIdentifier}&location_code=${country.iso_a3}`
            );
            const data = await response.json();

            if (data.data.length > 0) {
                fetchedCommodities = [...fetchedCommodities, ...data.data];
                console.log(`Fetched ${data.data.length} price records for ${country.name}, total: ${fetchedCommodities.length}`);
                offset += limit;
            } else {
                hasMoreData = false;
            }
        }

        const uniqueCommodities = [
            ...new Map(
                fetchedCommodities.map((item) => [item.commodity_name, { label: item.commodity_name, value: item.commodity_name }])
            ).values(),
        ];

        setCountryCommodities(uniqueCommodities);
    };

    const fetchPricesForCommodity = async (country, commodity) => {
        const limit = 1000;
        let offset = 0;
        let prices = [];
        let hasMoreData = true;

        while (hasMoreData) {
            const response = await fetch(
                `https://hapi.humdata.org/api/v1/food/food-price?output_format=json&limit=${limit}&offset=${offset}&app_identifier=${appIdentifier}&location_code=${country.iso_a3}&commodity_name=${commodity}`
            );
            const data = await response.json();

            if (data.data.length > 0) {
                prices = [...prices, ...data.data];
                console.log(`Fetched ${data.data.length} price records for ${commodity} in ${country.name}`);
                offset += limit;
            } else {
                hasMoreData = false;
            }
        }

        const latestDate = prices.reduce((max, item) => {
            const date = new Date(item.reference_period_end);
            return date > new Date(max) ? item.reference_period_end : max;
        }, null);

        const lastYearDate = new Date(new Date(latestDate).setFullYear(new Date(latestDate).getFullYear() - 1)).toISOString();

        const latestPrices = prices.filter((item) => item.reference_period_end === latestDate);
        const lastYearPrices = prices.filter((item) => item.reference_period_start.includes(lastYearDate));

        console.log('Latest Prices:', latestPrices);
        console.log('Last Year Prices:', lastYearPrices);
    };

    const fetchCitiesForCountry = async (country) => {
        setLoadingCities(true);
        try {
            const response = await fetch(
                `https://api.geoapify.com/v1/geocode/search?country=${country.name}&type=city&format=geojson&apiKey=${geoapifyKey}`
            );
            const data = await response.json();

            console.log("Cities: ", data);

            if (data.features.length > 0) {
                console.log(`Fetched ${data.features.length} cities for ${country.name}`);
                data.features.forEach((city) => {
                    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

                    mapRef.current.addSource(city.properties.city_id, {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [city],
                        },
                    });

                    mapRef.current.addLayer({
                        id: city.properties.city_id,
                        type: 'fill',
                        source: city.properties.city_id,
                        paint: {
                            'fill-color': randomColor,
                            'fill-opacity': 0.5,
                        },
                    });
                });
            } else {
                console.log(`No cities found for ${country.name}`);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoadingCities(false);
        }
    };

    const handleCountryChange = (e) => {
        setSelectedCountry(e.value);

        if (e.value && mapRef.current) {
            const map = mapRef.current;
            const bounds = new mapboxgl.LngLatBounds();
            e.value.geometry.coordinates.forEach((coord) => {
                coord.forEach((point) => bounds.extend(point));
            });
            map.fitBounds(bounds, { padding: 50 });
        }

        if (e.value) {
            fetchCountryCommodities(e.value);
            fetchCitiesForCountry(e.value);
        }
    };

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/outdoors-v12',
                projection: 'globe',
                zoom: 2,
            });
        }

        fetchAllCommodities();
    }, []);

    useEffect(() => {
        if (selectedCountry && commodity) {
            fetchPricesForCommodity(selectedCountry, commodity);
        }
    }, [selectedCountry, commodity]);

    return (
        <div>
            <Dropdown
                value={selectedCountry}
                options={allCountries}
                onChange={handleCountryChange}
                optionLabel="name"
                placeholder="Select a country"
                filter
                style={{ marginBottom: '1rem', width: '300px' }}
                disabled={allCountries.length === 0}
            />

            <Dropdown
                value={commodity}
                options={countryCommodities}
                onChange={(e) => setCommodity(e.value)}
                optionLabel="label"
                placeholder="Select a commodity"
                filter
                style={{ marginBottom: '1rem', width: '300px' }}
                disabled={countryCommodities.length === 0}
            />

            {loadingCities && <p>Loading cities...</p>}

            <div
                ref={mapContainerRef}
                style={{
                    width: '1400px',
                    height: '600px',
                }}
            />
        </div>
    );
};

export default MapboxGLMap;

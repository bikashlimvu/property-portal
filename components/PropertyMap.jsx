'use client';

import { useEffect, useState } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from './Spinner';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    language: 'en',
    region: 'us',
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        // Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);

        setCenter({
          lat,
          lng,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading && isLoaded) return <Spinner loading={loading} />;

  // Handle case where geocoding failed
  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading && (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    )
  );
};
export default PropertyMap;

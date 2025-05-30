import { useEffect, useRef } from 'react';

const MapView = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.9780 },
      zoom: 13,
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '90%',
        height: '70vh',
        margin: '2rem auto',
        border: '2px solid #6495ed',
        backgroundColor: '#e0e0e0',
      }}
    />
  );
};

export default MapView;

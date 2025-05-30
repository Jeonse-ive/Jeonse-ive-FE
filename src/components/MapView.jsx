import { useEffect, useRef, useState } from 'react';

const MapView = () => {
  const mapRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById('google-maps-script');

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.9780 },
      zoom: 13,
    });
  }, [loaded]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '90%',
        height: '500px',
        margin: '2rem auto',
        border: '2px solid #6495ed',
        backgroundColor: '#e0e0e0',
      }}
    >
      {!loaded && '지도 로딩 중...'}
    </div>
  );
};

export default MapView;

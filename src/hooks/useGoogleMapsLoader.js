// src/hooks/useGoogleMapsLoader.js
import { useEffect, useState } from 'react';

const useGoogleMapsLoader = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById('google-maps-script');
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      existingScript.onload = () => setLoaded(true);
    }
  }, []);

  return loaded;
};

export default useGoogleMapsLoader;

import { useEffect, useState } from 'react';

const useGoogleMapsLoader = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 이미 로드된 경우
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    // 중복 로딩 방지: 같은 URL을 가진 스크립트가 있는지 확인
    const existingScript = Array.from(document.getElementsByTagName('script')).find(script =>
      script.src.includes('maps.googleapis.com/maps/api/js')
    );

    if (existingScript) {
      // 이미 로드 중인 경우: initMap 호출만 기다리자
      const waitForGoogle = setInterval(() => {
        if (window.google && window.google.maps) {
          setLoaded(true);
          clearInterval(waitForGoogle);
        }
      }, 100);
      return () => clearInterval(waitForGoogle);
    }

    // 콜백 등록
    window.initMap = () => {
      setLoaded(true);
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps) {
        setLoaded(true);
      }
    };
    document.body.appendChild(script);

    

    return () => {
      delete window.initMap;
    };
  }, []);

  return loaded;
};

export default useGoogleMapsLoader;

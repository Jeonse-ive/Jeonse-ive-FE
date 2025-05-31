import { useEffect, useRef, useState } from 'react';
import axios from '../api/axiosInstance';
import '../styles/map/MapView.css'; //  커스텀 마커 스타일을 위한 CSS 추가

const MapView = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const instance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.9780 },
      zoom: 12,
      mapId: '2f078c6c6b250f4cad01c570',
    });

    setMap(instance);
  }, []);

  useEffect(() => {
    if (!map || !window.google.maps.marker) return;

    const { AdvancedMarkerElement } = window.google.maps.marker;

    const fetchStations = async () => {
      try {
        const res = await axios.get('/api/stations');
        const stations = res.data.data;

        stations.forEach(({ latitude, longitude, stationName, recentValue }) => {
          const markerContent = document.createElement('div');
          markerContent.className = 'custom-marker';
          markerContent.textContent = `${recentValue} dB`;

          new AdvancedMarkerElement({
            map,
            position: { lat: latitude, lng: longitude },
            title: stationName,
            content: markerContent,
          });
        });
      } catch (err) {
        console.error('측정소 데이터 요청 실패:', err);
      }
    };

    fetchStations();
  }, [map]);

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

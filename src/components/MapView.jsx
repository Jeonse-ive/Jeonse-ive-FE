import { useEffect, useRef, useState } from 'react';
import axios from '../api/axiosInstance';
import '../styles/map/MapView.css';

const MapView = ({ city, mapType }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

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

        const filtered = city === '전체'
          ? stations
          : stations.filter(s => s.shortAddress.startsWith(city));

        // 기존 마커 제거
        markers.forEach(marker => marker.map = null);

        const createdMarkers = [];

        filtered.forEach(({ latitude, longitude, stationName, recentValue, recordedAt }) => {
          let color;
          if (recentValue <= 60) color = '#4CAF50';
          else if (recentValue <= 75) color = '#FF9800';
          else color = '#F44336';

          const markerDiv = document.createElement('div');
          markerDiv.className = 'custom-marker';
          markerDiv.style.backgroundColor = color;
          markerDiv.innerText = `${recentValue} dB`;

          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: latitude, lng: longitude },
            title: stationName,
            content: markerDiv,
          });

          const infoWindow = new window.google.maps.InfoWindow();
          marker.addEventListener('gmp-click', () => {
            const content = `
              <strong>${stationName}</strong><br/>
              소음: ${recentValue} dB<br/>
              시간: ${new Date(recordedAt).toLocaleString()}
            `;
            infoWindow.setContent(content);
            infoWindow.open({ map, anchor: marker });
          });

          createdMarkers.push(marker);
        });

        setMarkers(createdMarkers);
      } catch (err) {
        console.error('측정소 데이터 요청 실패:', err);
      }
    };

    fetchStations();
  }, [map, city]);

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

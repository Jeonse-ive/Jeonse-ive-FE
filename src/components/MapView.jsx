import { useEffect, useRef, useState } from 'react';
import axios from '../api/axiosInstance';
import '../styles/map/MapView.css';

const MapView = ({ city, mapType }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // 기존 마커 추적
  const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const instance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.9780 },
      zoom: 12,
      mapId: mapId,
    });

    setMap(instance);
  }, []);

  useEffect(() => {
    if (!map || !window.google.maps.marker || !mapType) return;

    const { AdvancedMarkerElement } = window.google.maps.marker;

    const clearMarkers = () => {
      markers.forEach((m) => m.setMap(null));
      setMarkers([]);
    };

    const fetchAndRender = async () => {
      clearMarkers(); // 기존 마커 제거

      if (mapType === 'noise') {
        try {
          const res = await axios.get('/api/stations');

          const stations = Array.isArray(res.data.data) ? res.data.data : [];

          const filteredStations = city === '전체'
            ? stations
            : stations.filter(s => s.shortAddress.startsWith(city));

          const newMarkers = [];

          filteredStations.forEach(({ latitude, longitude, stationName, recentValue, recordedAt }) => {
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
            marker.addEventListener('click', () => {
              const content = `
                <strong>${stationName}</strong><br/>
                소음: ${recentValue} dB<br/>
                시간: ${new Date(recordedAt).toLocaleString()}
              `;
              infoWindow.setContent(content);
              infoWindow.open({ map, anchor: marker });
            });

            newMarkers.push(marker); // 마커 배열에 추가
          });

          setMarkers(newMarkers); // 상태 업데이트

        } catch (err) {
          console.error('소음 데이터 요청 실패:', err);
        }
      } else if (mapType === 'fraud') {
          clearMarkers(); // 기존 마커 제거
          setMarkers([]); // 상태도 초기화 ← 이거 추가
          console.log('전세사기 지도 로딩 준비 중...');
        }
    };

    fetchAndRender();
  }, [map, city, mapType]);

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

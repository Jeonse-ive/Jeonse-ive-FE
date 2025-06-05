import { useEffect, useRef, useState } from 'react';
import axios from '../../api/axiosInstance';
import '../../styles/map/MapView.css';

const FraudMap = ({ city }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API 로딩 실패');
      return;
    }

    const instance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.9780 },
      zoom: 11,
      mapId,
    });

    console.log('[지도 초기화 완료]');
    setMap(instance);
  }, []);

  useEffect(() => {
    if (!map || !window.google.maps.Geocoder || !window.google.maps.marker) {
      console.warn('지도 또는 Marker/Geocoder 초기화 미완료');
      return;
    }

    const { AdvancedMarkerElement } = window.google.maps.marker;
    const geocoder = new window.google.maps.Geocoder();

    const clearMarkers = () => {
      console.log(`[마커 제거] 기존 ${markers.length}개`);
      markers.forEach((m) => m.setMap(null));
      setMarkers([]);
    };

    const fetchAndRender = async () => {
      clearMarkers();

      try {
        console.log(`[API 요청] /api/fraud/count?city=${city}`);
        const requestCity = city === '전체' ? 'All' : city;

        const res = await axios.get('/api/fraud/count', {
          params: { city: requestCity },
        });

        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        console.log(`[응답 수신 완료] 항목 수: ${data.length}`);

        if (data.length === 0) {
          console.warn('[경고] 응답 데이터 없음');
          return;
        }

        const newMarkers = [];

        for (const { gu, damagedHouses } of data) {
          const address = `${city} ${gu}`;
          console.log(`[지오코딩 요청] 주소: ${address}`);

          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const location = results[0].geometry.location;
              console.log(`[지오코딩 성공] ${address} → lat: ${location.lat()}, lng: ${location.lng()}`);

              let color;
              if (damagedHouses <= 50) color = '#4CAF50';
              else if (damagedHouses <= 200) color = '#FF9800';
              else color = '#F44336';

              const markerDiv = document.createElement('div');
              markerDiv.className = 'custom-marker';
              markerDiv.style.backgroundColor = color;
              markerDiv.innerText = `${damagedHouses}건`;

              const marker = new AdvancedMarkerElement({
                map,
                position: location,
                title: `${gu} 피해`,
                content: markerDiv,
              });

              const infoWindow = new window.google.maps.InfoWindow();
              marker.addEventListener('click', () => {
                const content = `
                  <strong>${gu}</strong><br/>
                  피해 주택: ${damagedHouses}건
                `;
                infoWindow.setContent(content);
                infoWindow.open({ map, anchor: marker });
              });

              newMarkers.push(marker);
              setMarkers((prev) => [...prev, marker]);
              console.log(`[마커 추가 완료] ${gu} (${damagedHouses}건)`);

            } else {
              console.warn(`[지오코딩 실패] ${address} → 상태: ${status}`);
            }
          });
        }
      } catch (err) {
        console.error('[에러] API 요청 실패:', err);
      }
    };

    fetchAndRender();
  }, [map, city]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default FraudMap;

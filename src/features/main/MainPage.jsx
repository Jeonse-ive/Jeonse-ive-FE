import React, { useState, useEffect } from 'react';

import LoginModal from '../auth/LoginModal';
import MapView from '../../components/MapView';
import useGoogleMapsLoader from '../../hooks/useGoogleMapsLoader';
import Header from '../../components/Header';
import axios from '../../api/axiosInstance';

import '../../styles/MainPage.css';

const LOGIN_STATE = true;

const MainPage = () => {
  const [isLoggedIn] = useState(LOGIN_STATE);
  const [showLogin, setShowLogin] = useState(false);
  const [mapType, setMapType] = useState(null);       // 'noise' | 'fraud'
  const [showMap, setShowMap] = useState(false);       // 버튼 위치 기준 상태
  const loaded = useGoogleMapsLoader();
  const [selectedCity, setSelectedCity] = useState('전체');
  const [cityList, setCityList] = useState([]);

  const handleClick = (type) => {
    setMapType(type);
    setShowMap(true); // 버튼 누른 이후 위로 이동하게 설정
  };

    useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get('/api/stations');
        const stations = res.data.data;
        const cities = [...new Set(stations.map(s => s.shortAddress.split(' ')[0]))];
        setCityList(['전체', ...cities]);
      } catch (err) {
        console.error('도시 목록 불러오기 실패:', err);
      }
    };

    fetchCities();
  }, []);

    useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true); // 로그인 안된 상태면 모달 자동 표시
    }
  }, [isLoggedIn]);

  return (
    <div className="main-container">
    <Header />


      <main className="main-content" style={{ justifyContent: showMap ? 'flex-start' : 'center' }}>
        {isLoggedIn ? (
          <div className="content-wrapper">
            <div className={`button-group ${showMap ? 'map-shown' : ''}`}>
            <button className="map-button" onClick={() => handleClick('noise')}>소음지도 보기</button>
            <button className="map-button" onClick={() => handleClick('fraud')}>전세사기 지도 보기</button>
            </div>

            <div className={`map-wrapper ${showMap ? 'visible' : ''}`}>
              {mapType === 'noise' && (
                <select
                  className="city-selector"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cityList.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              )}

              {loaded && <MapView city={selectedCity} mapType={mapType} />}
            </div>
          </div>
        ) : (
          showLogin && <LoginModal onClose={() => setShowLogin(false)} />
        )}
      </main>
    </div>
  );
};

export default MainPage;

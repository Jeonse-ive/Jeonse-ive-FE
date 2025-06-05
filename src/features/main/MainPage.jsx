import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LoginModal from '../auth/LoginModal';
import MapView from '../../components/map/MapView';
import useGoogleMapsLoader from '../../hooks/useGoogleMapsLoader';
import Header from '../../components/Header';
import axios from '../../api/axiosInstance';


import '../../styles/MainPage.css';

const MainPage = () => {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // ✅ 로그인 검사 완료 여부
  const [showLogin, setShowLogin] = useState(false);

  const [mapType, setMapType] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedCity, setSelectedCity] = useState('전체');
  const [cityList, setCityList] = useState([]);

  const loaded = useGoogleMapsLoader();

  const handleClick = (type) => {
    setMapType(type);
    setShowMap(true);
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
    const token = localStorage.getItem('accessToken');
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);

    if (location.state?.showLogin || !loggedIn) {
      setShowLogin(true);
    }

    setAuthChecked(true); // ✅ 검사 완료 표시
  }, [location]);

  return (
    <div className="main-container">
      <Header />

      <main className="main-content" style={{ justifyContent: showMap ? 'flex-start' : 'center' }}>
        {!authChecked ? (
          <p>로딩 중...</p> // 최초 진입 시 깜빡임 방지
        ) : isLoggedIn ? (
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

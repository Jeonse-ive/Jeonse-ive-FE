import React, { useState } from 'react';

import LoginModal from '../auth/LoginModal';
import MapView from '../../components/MapView';
import useGoogleMapsLoader from '../../hooks/useGoogleMapsLoader';

import '../../styles/MainPage.css';

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [mapType, setMapType] = useState(null);       // 'noise' | 'fraud'
  const [showMap, setShowMap] = useState(false);       // 버튼 위치 기준 상태
  const loaded = useGoogleMapsLoader();

  const handleClick = (type) => {
    setMapType(type);
    setShowMap(true); // 버튼 누른 이후 위로 이동하게 설정
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <h1 className="logo">Jeonse-ive</h1>
        <a className="mypage-link" href="/mypage">마이페이지</a>
      </header>

      <main className="main-content" style={{ justifyContent: showMap ? 'flex-start' : 'center' }}>
        {isLoggedIn ? (
          <div className="content-wrapper">
            <div className={`button-group ${showMap ? 'map-shown' : ''}`}>
            <button className="map-button" onClick={() => handleClick('noise')}>소음지도 보기</button>
            <button className="map-button" onClick={() => handleClick('fraud')}>전세사기 지도 보기</button>
            </div>

            <div className={`map-wrapper ${showMap ? 'visible' : ''}`}>
              {loaded && <MapView />}
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

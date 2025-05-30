import React, { useState } from 'react';

import LoginModal from '../auth/LoginModal';
import MapView from '../../components/MapView';

import '../../styles/MainPage.css';


const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [mapType, setMapType] = useState(null); // 'noise' | 'fraud' | null

  return (
    <div className="main-container">
      <header className="main-header">
        <h1 className="logo">Jeonse-ive</h1>
        <a className="mypage-link" href="/mypage">마이페이지</a>
      </header>

      <main className="main-content" style={{ flexDirection: 'column', gap: '2rem' }}>
        {isLoggedIn ? (
          <>
            <div className="button-group">
              <button className="map-button" onClick={() => setMapType('noise')}>소음지도 보기</button>
              <button className="map-button" onClick={() => setMapType('fraud')}>전세사기 지도 보기</button>
            </div>
            {mapType && <MapView />}
          </>
        ) : (
          <>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
          </>
        )}
      </main>
    </div>
  );
};

export default MainPage;

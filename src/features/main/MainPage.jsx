import React, { useState } from 'react';

import LoginModal from '../auth/LoginModal';

import '../../styles/MainPage.css';


const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="main-container">
      <header className="main-header">
        <h1 className="logo">Jeonse-ive</h1>
        <a className="mypage-link" href="/mypage">마이페이지</a>
      </header>

      <main className="main-content">
        {isLoggedIn ? (
          <div className="button-group">
            <button className="map-button">소음지도 보기</button>
            <button className="map-button">전세사기 지도 보기</button>
          </div>
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

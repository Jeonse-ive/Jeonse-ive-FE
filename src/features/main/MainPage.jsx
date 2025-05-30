import React, { useState, useEffect } from 'react';
// import LoginModal from '../auth/LoginModal'; // 추후에 추가
import '../../styles/MainPage.css';

const MainPage = () => {
  // 나중에 context나 localStorage로 대체할 예정
  const [isLoggedIn, setIsLoggedIn] = useState(true); // false로 바꾸면 로그인 안된 상태

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
          <div>
            {/* 로그인 모달 자리 */}
            <p>로그인이 필요합니다.</p>
            {/* <LoginModal /> */}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;

// src/pages/MyPage.jsx
import React from 'react';
import Header from '../../components/Header';

import '../../styles/mypage/MyPage.css';

const MyPage = () => {
  return (
    <div className="main-container">
      <Header />

      <main className="mypage-content">
        <h2>마이페이지</h2>
        <p><strong>이메일:</strong> user@example.com</p>
        <p><strong>닉네임:</strong> 사용자닉네임</p>

        <div className="mypage-buttons">
          <button className="mypage-button">로그아웃</button>
          <button className="mypage-button">회원정보 수정</button>
          <button className="mypage-button">회원탈퇴</button>
        </div>
      </main>
    </div>
  );
};

export default MyPage;

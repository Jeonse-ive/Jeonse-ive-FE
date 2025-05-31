// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // 필요 시 분리된 CSS 사용

const Header = () => {
  return (
    <header className="main-header">
      <Link to="/" className="logo">Jeonse-ive</Link>
      <Link className="mypage-link" to="/mypage">마이페이지</Link>
    </header>
  );
};

export default Header;

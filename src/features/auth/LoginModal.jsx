import React from 'react';
import '../../styles/login/LoginModal.css'

const LoginModal = ({ onClose }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: 로그인 로직
    alert('로그인 시도');
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <h2 className="modal-title">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="modal-label">Id</label>
          <input type="text" className="modal-input" required />

          <label className="modal-label">Password</label>
          <input type="password" className="modal-input" required />

          <div className="modal-subtext">
            아이디가 없으신가요? <a href="#">회원가입하기</a>
          </div>

          <button type="submit" className="modal-login-button">로그인</button>
        </form>

        <div className="social-login">
          <div className="social-button">구글 로그인<br />아이콘</div>
          <div className="social-button">카카오 로그인<br />아이콘</div>
          <div className="social-button">네이버 로그인<br />아이콘</div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

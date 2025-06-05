import React, { useState } from 'react';
import axios from '../../api/axiosInstance';
import '../../styles/login/LoginModal.css';

const LoginModal = ({ onClose }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/login', form);

      const { accessToken } = res.data.data;
      if (!accessToken) throw new Error('accessToken이 응답에 없습니다.');

      localStorage.setItem('accessToken', accessToken);
      onClose(); // 모달 닫기
      window.location.reload(); // MainPage 리렌더링을 위한 새로고침
    } catch (err) {
      console.error('로그인 실패:', err);
      setError(err.response?.data?.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <h2 className="modal-title">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="modal-label">이메일</label>
          <input
            type="email"
            name="email"
            className="modal-input"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="modal-label">비밀번호</label>
          <input
            type="password"
            name="password"
            className="modal-input"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <div className="modal-subtext">
            아이디가 없으신가요? <a href="/signup">회원가입하기</a>
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

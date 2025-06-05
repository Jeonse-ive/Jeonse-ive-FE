import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/SignUpPage.css';
import axios from '../../api/axiosInstance';

const SignUpPage = () => {
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/members/signup', {
        ...form,
        role: 'USER', // 필수
      });
      alert('회원가입이 완료되었습니다!');
      navigate('/', { state: { showLogin: true } }); // 메인으로 이동 + 로그인 모달 자동 표시
    } catch (err) {
      const message = err.response?.data?.message || '서버 오류가 발생했습니다.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호 (6자 이상)"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? '가입 중...' : '가입하기'}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

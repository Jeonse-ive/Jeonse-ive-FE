import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import EditUserModal from './EditUserModal';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/mypage/MyPage.css';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/members/me');
        setUserInfo(res.data.data);
      } catch (err) {
        console.error('내 정보 조회 실패:', err);
        alert('사용자 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchMyInfo();
  }, []);

const handleLogout = async () => {
  try {
    await axiosInstance.post('/api/auth/logout');

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  } catch (err) {
    console.error('로그아웃 실패:', err);
    alert('로그아웃 처리 중 오류가 발생했습니다.');
  }
};

const handleDelete = async () => {
  const confirmed = window.confirm('정말로 회원 탈퇴하시겠습니까?');
  if (!confirmed) return;

  const password = prompt('비밀번호를 입력하세요:');
  if (!password) return;

  try {
    await axiosInstance.delete('/api/members/', {
      params: { password }  // ✅ params 대신 data로 전달
    });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('회원 탈퇴 처리되었습니다.');
    window.location.href = '/';
  } catch (err) {
    console.error('회원 탈퇴 실패:', err);
    alert('회원 탈퇴에 실패했습니다.');
  }
};

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSubmit = (updatedInfo) => {
    setUserInfo(updatedInfo);
  };

  if (!userInfo) return <p className="loading">로딩 중...</p>;

  return (
    <div className="main-container">
      <Header />
      <div className="mypage-container">
        <h2>마이페이지</h2>
        <div className="user-info">
          <p><span>이메일:</span> {userInfo.email}</p>
          <p><span>닉네임:</span> {userInfo.nickname}</p>
        </div>
        <div className="mypage-buttons">
          <button onClick={handleEdit}>회원정보 수정</button>
          <button onClick={handleLogout}>로그아웃</button>
          <button className="delete" onClick={handleDelete}>회원탈퇴</button>
        </div>
      </div>

      {showEditModal && (
        <EditUserModal
          userInfo={userInfo}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default MyPage;

import React, { useState } from 'react';
import Header from '../../components/Header';
import EditUserModal from './EditUserModal';
import '../../styles/mypage/MyPage.css';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: 'user@example.com',
    nickname: '유저',
  });

  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
  };

  const handleDelete = () => {
    const confirmed = window.confirm('정말로 회원 탈퇴하시겠습니까?');
    if (confirmed) {
      alert('회원 탈퇴 처리되었습니다.');
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSubmit = (updatedInfo) => {
    setUserInfo(updatedInfo);
    alert('회원정보가 수정되었습니다.');
  };

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

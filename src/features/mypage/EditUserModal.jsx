import React, { useState } from 'react';
import axios from '../../api/axiosInstance';
import '../../styles/mypage/EditUserModal.css';

const EditUserModal = ({ userInfo, onClose, onSubmit }) => {
  const [nickname, setNickname] = useState(userInfo.nickname);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put('/api/members/memberInfo', {
        email: userInfo.email,
        nickname,
        password: '' // 비밀번호 변경은 없으므로 공백 또는 null 처리
      });

      alert('회원정보가 수정되었습니다.');
      onSubmit(res.data.data); // 수정된 데이터로 상태 갱신
      onClose();
    } catch (err) {
      console.error('회원정보 수정 실패:', err);
      alert('회원정보 수정에 실패했습니다.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h3>회원정보 수정</h3>
        <form onSubmit={handleSubmit}>
          <label>이메일</label>
          <input value={userInfo.email} readOnly disabled />

          <label>닉네임</label>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} required />

          <div className="modal-buttons">
            <button type="submit">저장</button>
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;

// src/features/mypage/EditUserModal.jsx
import React, { useState } from 'react';
import '../../styles/mypage/EditUserModal.css';

const EditUserModal = ({ userInfo, onClose, onSubmit }) => {
  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickname] = useState(userInfo.nickname);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, nickname });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h3>회원정보 수정</h3>
        <form onSubmit={handleSubmit}>
          <label>이메일</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />

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

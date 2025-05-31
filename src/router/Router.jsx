import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';
import App from '../App'; // 테스트용 페이지
import SignUpPage from '../features/auth/SignUpPage';
import MyPage from '../features/mypage/MyPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/test" element={<App />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

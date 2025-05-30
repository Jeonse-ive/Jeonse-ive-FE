import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import App from '../App'; // 테스트용 페이지

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

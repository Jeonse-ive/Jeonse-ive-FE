import { useEffect, useState } from 'react';
import { getTest } from './api/testApi';
import './test.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest();
        setMessage(data.message); // 백엔드가 { message: "Hello World" } 이런거 리턴한다고 가정
      } catch (error) {
        console.error('Error fetching test API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>프론트 - 백엔드 연결 테스트</h1>
      <p>{message ? message : 'Loading...'}</p>
    </div>
  );
}

export default App;
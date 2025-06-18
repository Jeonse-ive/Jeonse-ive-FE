## Jeonse-ive-FE

Jeonse-ive FE는 사용자와의 직접적인 상호작용을 담당하는 부분으로 아래와 같은 역할을 수행합니다.
- 사용자 인터페이스(UI) 구성: 로그인, 회원가입, 지도 페이지 등 사용자 중심의 화면을 React + Vite 기반으로 구성
- 데이터 시각화: 구글 맵 API와 연동하여 지역별 전세사기 데이터 및 소음 데이터를 시각적으로 표시
- API 통신: 백엔드(Spring Boot API 서버)와의 통신을 통해 사용자 인증 및 지역별 정보 조회 기능 수행
- Nginx를 통한 정적 파일 서빙: Vite로 빌드된 파일을 Nginx를 통해 EC2에 배포
 
### 사용자 시나리오
1. 회원가입/로그인
   - 사용자는 이메일과 비밀번호를 입력하여 회원가입
   - 로그인 시, JWT 토큰이 발급되어 인증 상태 유지
2. 지도 조회
   - 로그인 후, 사용자는 Google Maps 기반의 인터페이스를 통해 지도에 접근
   - 지도 좌측 상단 필터를 통해 보고 싶은 지역(구 단위)을 선택
3. 전세사기/소음 데이터 확인
   - 선택된 지역의 전세사기 발생 횟수가 지도에 표시됨 (횟수에 따라 색이 다름, 위험지역은 빨간색)
   - 선택된 지역의 평균 소음 데시벨 수치 시각화(데시벨 수치 높을수록 빨간색)
4. 로그아웃 및 재접속
   - 로그앗 시 클라이언트의 토큰이 삭제됨
   - 재로그인 시 Refresh Token을 통해 토큰 재발급 가능

### 기술 스택
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white"/>
</div>

### 설치 및 실행 방법(로컬)
``` bash
git clone https://github.com/Jeonse-ive/Jeonse-ive-FE.git
cd Jeonse-ive-FE
npm install
npm run dev
```

### 빌드 및 배포
EC2 + Nginx + React-Vite 빌드  

1. 로컬 개발
   - React + Vite로 기능 개발
   - .env 파일로 API 서버 주소와 구글맵 키 설정
2. EC2에 빌드 파일 배포
   - Github Actions를 통해 dist/ 폴더를 EC2 서버에 업로드 자동화

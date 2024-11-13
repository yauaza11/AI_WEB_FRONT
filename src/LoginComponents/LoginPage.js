import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import cafeLogo from '../assets/images/cafe_chuchu_logo.png';
//import naverLogo from '../assets/images/naver_icon.png';
//import kakaoLogo from '../assets/images/kakao_icon.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, password })
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // 응답 데이터 확인
        console.log('로그인 응답 데이터:', data);
  
        // 로그인 성공 시 토큰 저장 확인
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          navigate('/home');
        } else {
          setError('토큰을 가져오는 데 실패했습니다.');
        }
      } else {
        setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('서버 오류:', error);
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };  

  return (
    <div className="login-container">
      <img src={cafeLogo} alt="Cafe ChuChu" className="loginpage-logo" />
      <h2 className="login-title">로그인</h2>
      <input
        type="text"
        className="input-label_1"
        placeholder="아이디 입력"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
      />
      <input
        type="password"
        className="input-label_2"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button className="login-button login" onClick={handleLogin}>
        로그인
      </button>

      <Link to="/signup" className="link_3">회원가입</Link>
    
    </div>
  );
};

export default LoginPage;

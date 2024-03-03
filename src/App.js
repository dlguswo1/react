import React from 'react';
import { Link, Route, Routes, redirect, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

import MainList from './components/mainList'

//view
import Main1 from './components/View/main1';
import Main2 from './components/View/main2';
import Main3 from './components/View/main3';
import Main4 from './components/View/main11';
import Main5 from './components/View/main22';
import Main6 from './components/View/main33';

import Login from './member/login';
import Join from './member/join';
import BoardWrite from './Board/boardWrite';
import BoardEdit from './Board/boardEdit';

import Header from './header/header';
import Admin from './admin/admin';
import Recall from './components/View/reCall';
import { Form } from 'react-bootstrap';


function App() {

  // 메인 페이지 설정
  const location = useLocation();
  const mainPage = location.state?.mainPage || 'main1';
  

  // const [mainComponent, setMainComponent] = useState('main1');


  // 세션
  const [isLogin, setIsLogin] = useState(false); //로그인 관리

  useEffect(() => {
    // 세션스토리지에 있는 memberId
    const memberId = sessionStorage.getItem("member_id");
    setIsLogin(memberId != null);

    if (sessionStorage.getItem("member_id") === null) {
      // sessionStorage 에 members_id 라는 key 값으로 저장된 값이 없다면
      setIsLogin(false);
    } else {
      // sessionStorage 에 members_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true);
    }
  }, [isLogin]);

  // 메인 페이지 변경 함수


  return (

    <div className="App">
      <Header isLogin={isLogin} />
      <header className="App-header">
        <Routes>
        <Route path="/" element={mainPage === 'main1' ? <Main1 /> : mainPage === 'main2' ? <Main2 /> : <Main3 />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/main1" element={<Main1 />} />
          <Route path="/main2" element={<Main2 />} />
          <Route path="/main3" element={<Main3 />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/boardWrite" element={<BoardWrite />} />
          <Route path={`/boardEdit/:id`} element={<BoardEdit />} />
          <Route path={`/boardDelete/:id`} element={<Recall />} />
          <Route path="/main4" element={<Main4 />} />
          <Route path="/main5" element={<Main5 />} />
          <Route path="/main6" element={<Main6 />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

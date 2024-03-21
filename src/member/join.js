import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import './member.css';
import axios from 'axios';

function Join() {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!memberId || !memberPw) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/join`, {
        memberId: memberId,
        memberPw: memberPw,
      }
      );
      if (response.status === 200) {
        navigate('/login');
      }
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("이미 존재하는 아아디입니다.")
      }
      console.error(error);
    }

  };
  return (
    <div className="Join member">
      <Form className='join' onSubmit={handleSubmit} method='POST' action='/join'>
        <h1 className='text-center'>회원가입</h1>
        <br />
        <Form.Group controlId="formGroupId">
          <Form.Label>아이디</Form.Label>
          <Form.Control type="text" placeholder="아이디를 입력하세요." onChange={e => setMemberId(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
            아이디를 입력해주세요.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호를 입력하세요." onChange={e => setMemberPw(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
            비밀번호를 입력해주세요.
          </Form.Control.Feedback>
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          회원가입
        </Button>
      </Form>
      <br />
    </div>
  );
}

export default Join;

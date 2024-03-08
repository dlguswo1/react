import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  // form 요소애 접근
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/login', { // 로그인 요청
        memberId: formRef.current.memberId.value,
        memberPw: formRef.current.memberPw.value
      })
      .then((res) => {
        sessionStorage.setItem("member_id", res.data.memberId);
        sessionStorage.setItem("members_id", res.data.id);
        localStorage.setItem("accesstoken",res.data.accessToken)
        document.location.href = "/";
      })
      .catch((err) => {
        // alert("아이디 또는 비밀번호를 올바르게 입력해주세요.");
        alert(err.response.data);
      });
  };
  return (
    <div className="Login member">
      <Form className='login' validated={false} ref={formRef} onSubmit={handleSubmit}>
        <h1 className='text-center'>로그인</h1>
        <br />
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>아이디</Form.Label>
          <Form.Control type="text" name='memberId' placeholder="아이디를 입력해주세요." required />
          <Form.Control.Feedback type="invalid">
            아이디를 입력해주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" name='memberPw' placeholder="비밀번호를 입력해주세요." required />
          <Form.Control.Feedback type="invalid">
            비밀번호를 입력해주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button className="mb-3" variant="primary" type="submit">
          로그인
        </Button>
        <Form.Group className='text-center link'>
          <Link to='/join'> 회원가입  </Link>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;

import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
  // form 요소애 접근
  const formRef = useRef();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);

  // const handleFileChange = (e) => {
  //   const fileList = e.target.files;
  //   setSelectedFile([...fileList]); // 파일 선택 시 상태 업데이트
  // };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files); // FileList 객체를 배열로 변환
    setSelectedFile(prevFiles => [...prevFiles, ...fileList]); // 이전 파일들과 새로운 파일들을 합쳐서 업데이트
  };

  // const handleCancelFile = () => {
  //   setSelectedFile(null); // 파일 취소 시 상태 업데이트
  //   formRef.current.reset(); // 파일 입력 필드 리셋
  // };

  const handleCancelFile = (indexToRemove) => {
    setSelectedFile(prevFiles => {
      const updatedFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      if (updatedFiles.length === 0) {
        formRef.current.reset(); // 파일 입력 필드 리셋
      }
      return updatedFiles.length === 0 ? null : updatedFiles; // 파일 상태 초기화 조건 추가
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("모든사항 기입 요망")
      return;
    }
    if (category === "") {
      alert("카테고리를 설정해주세요")
      return;
    }

    const formData = new FormData(); // FormData 객체 생성

    // FormData 객체에 데이터 추가
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    // if (e.target.elements.file.files.length > 0) {
    //   formData.append('boardFile', e.target.elements.file.files[0]);
    // }

    const files = e.target.elements.file.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append(`boardFile`, files[i]);
      }
    }
    console.log(files)

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/boardWrite`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 헤더에 Content-Type 설정
          'Authorization': `Bearer ${token}`
        }
      });



      if (response.status === 200) {
        navigate('/main1');
        alert("게시글 등록 완료.")
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  const token = localStorage.getItem('accesstoken')
  console.log(token)
  const memberId = localStorage.getItem("memberId")
  console.log(memberId)

  return (

    <Container>
      <main className="mt-5 pt-5">
        <Row className="justify-content-center">
          <Col className="text-center">
            <h1>글 등록</h1>
          </Col>
        </Row>
        <hr />
        <br></br><br></br>
        <Form className='boardWrite' ref={formRef} onSubmit={handleSubmit} encType='multipart/form-data'>
          <InputGroup>
            <InputGroup.Text style={{ width: '100px', fontWeight: 'bold' }}>카테고리</InputGroup.Text>
            <Form.Select name='category' onChange={e => setCategory(e.target.value)}>
              <option value="">카테고리 선택</option>
              <option value="korean">국어</option>
              <option value="english">영어</option>
              <option value="math">수학</option>
              <option value="science">과학</option>
            </Form.Select><br></br>
          </InputGroup>

          <InputGroup>
            <InputGroup.Text style={{ width: '100px', fontWeight: 'bold' }}>제목</InputGroup.Text>
            <Form.Control type="textarea" name='title' placeholder="제목을 입력해주세요." onChange={e => setTitle(e.target.value)} required />
          </InputGroup>

          <Form.Group>
            <input type='file' name='file' onChange={handleFileChange} multiple />
            {selectedFile && selectedFile.map((file, index) => ( // 파일 선택 시 각 파일마다 표시
              <div key={index} style={{ display: 'flex' }}>
                <p>{file.name}</p>
                <CloseButton onClick={() => handleCancelFile(index)} className="mt-2" style={{ marginTop: '0' }} />
              </div>
            ))}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              style={{ height: '400px' }}
              name='content'
              placeholder="내용를 입력해주세요."
              onChange={e => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <br />
          <Row className="justify-content-start mt-3">
            <Col>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type='submit'>
                  등록
                </Button>
              </div>
            </Col>
          </Row>

        </Form>
      </main>
    </Container>
  );
};

export default BoardWrite;
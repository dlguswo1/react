import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardEdit = () => {

    const [data, setData] = useState({
        title: '',
        category: '',
        content: '',
        storedFileName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const formRef = useRef();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const { id } = useParams();


    useEffect(() => {
        setLoading(true)
        axios.get(`/boardEdit/${id}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => setError(err))
    }, [])

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!data) return null;



    const handleSubmit = async (e) => {
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함
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
        if (e.target.elements.file.files.length > 0) {
            formData.append('boardFile', e.target.elements.file.files[0]);
        }

        try {
            const response = await axios.post(`/boardEdit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // 헤더에 Content-Type 설정
                }
            });
            if (response.status === 200) {
                navigate('/main1');
                alert("게시글 수정 완료.")
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <Container>
            <main className="mt-5 pt-5">
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <h1>글 수정</h1>
                    </Col>
                </Row>
                <hr />
                <br></br><br></br>
                <Form className='boardWrite' ref={formRef} onSubmit={handleSubmit} encType='multipart/form-data'>
                    <InputGroup>
                        <InputGroup.Text style={{ width: '100px', fontWeight: 'bold' }}>카테고리</InputGroup.Text>
                        <Form.Select name='category' defaultValue={data.category} onChange={e => setCategory(e.target.value)}>
                            <option value="">카테고리 선택</option>
                            <option value="korean">국어</option>
                            <option value="english">영어</option>
                            <option value="math">수학</option>
                            <option value="science">과학</option>
                        </Form.Select><br></br>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style={{ width: '100px', fontWeight: 'bold' }}>제목</InputGroup.Text>
                        <Form.Control type="text" name='title' defaultValue={data.title} onChange={e => setTitle(e.target.value)} />
                    </InputGroup>

                    <Form.Group>
                        <Form.Control type='file' name='file' />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Control
                            as="textarea"
                            style={{ height: '400px' }}
                            name='content'
                            defaultValue={data.content}
                            onChange={e => setContent(e.target.value)}
                            required
                        />
                    </Form.Group><br />


                    <Row className="justify-content-start">
                        <Col>
                            <div className="d-flex justify-content-end mt-3">
                                <Button variant="primary" type='submit'>
                                    수정완료
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </main>
        </Container>
    );
};

export default BoardEdit;

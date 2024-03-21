import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, CloseButton } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { upload } from '@testing-library/user-event/dist/upload';

const BoardEdit = () => {

    const [data, setData] = useState({
        title: '',
        category: '',
        content: '',
        storedFileName: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const formRef = useRef();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const { id } = useParams();


    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/boardEdit/${id}`)
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
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/boardEdit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 헤더에 Content-Type 설정
                    'Authorization': `Bearer ${token}`
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

    // const uploadName = (e) => {
    //     var files = e.files;
    //     var filename = files[0].name;

    //     var upload_name = e.parent.preciousElementSibling;
    //     upload_name.value = filename;
    // }

    const handleFilesChange = (event) => {
        const fileList = event.target.files;
        setFiles([...fileList]);
    };

    const handleFileDelete = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const token = localStorage.getItem('accesstoken')
    console.log(token)

    // const imgUrl = `${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/upload/${data.storedFileName}`
    const cleanedFileNames = data.storedFileName.map(fileName => fileName.replace(/\[|\]/g, ''));
    console.log(cleanedFileNames)

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

                    <Form.Label style={{ width: '100px', fontWeight: 'bold' }}>이미지</Form.Label>
                    <Form.Group style={{ display: 'flex' }}>
                        {cleanedFileNames && cleanedFileNames.length > 0 ? (
                            cleanedFileNames.map((fileNames, index) => (
                                <div key={index}>
                                    {/* 파일 이름이 콤마(,)로 구분되어 있으므로 split() 함수를 사용하여 배열로 분할합니다. */}
                                    {fileNames.split(',').map((fileName, innerIndex) => (
                                        <div key={innerIndex} style={{display:'flex', marginBottom:10}}>
                                            {/* <img src={`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/upload/${fileName.trim()}`}/> */}
                                            <img src={`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/upload/${fileName.trim()}`} alt={`이미지 ${innerIndex}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                            <div><CloseButton /></div>
                                        </div>
                                    ))}        
                                </div>
                            ))
                        ) : (
                            <div>이미지가 없습니다.</div>
                        )}
                    </Form.Group>
                    <div>
                        <Form>
                            <Form.Group controlId="formFile" className="mb-3">
                                <input type="file" onChange={handleFilesChange} multiple className="uploadFile" />
                            </Form.Group>
                        </Form>

                        <div>
                            {files.map((file, index) => (
                                <div key={index}>
                                    {file.name}
                                    <CloseButton onClick={() => handleFileDelete(index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <input type='file' name='file' multiple="multiple" onChange={uploadName(this)}/> */}

                    <Form>

                    </Form>

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

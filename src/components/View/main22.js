import React from "react";

import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from "axios";

import { Link } from "react-router-dom";

import './main1.css'

const Main22 = () => {

    const [clickedData, setClickedData] = useState(null);
    const [PopupView, setPopupView] = useState(false);
    const [data, setData] = useState([

    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true)
        axios.get(`/main2`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => setError(err))
    }, [])

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!data) return null;

    const handleClick = (data) => {
        setClickedData(data);
        setPopupView(true);
    }

    const handleClosePopup = () => {
        setPopupView(false);
    }

    // 카테고리 분류
    const mathData = data.filter(item => item.category === "math");
    const engData = data.filter(item => item.category === "english");
    const korData = data.filter(item => item.category === "korean");
    const sciData = data.filter(item => item.category === "science");

    const memberId = sessionStorage.getItem("members_id")

    console.log(mathData)
    console.log(korData)


    return (
        <div>
            <table class="board-table">
                <div className="boardList">

                    <div className="korean">
                        {korData.map((item, index) => (
                            <Card key={index} style={{ width: '18rem', marginBottom: '20px' }}>
                                <Card.Body>
                                    <Card.Title className="board-title">카테고리 : 국어</Card.Title>
                                    <Card.Text className="board-content">{item.title}</Card.Text>
                                    {item.content}<br /><br />
                                    <Button variant="primary" onClick={() => { handleClick(item) }}>게시물 보기</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    <div className="english">
                        {engData.map((item, index) => (
                            <Card key={index} style={{ width: '18rem', marginBottom: '20px' }}>
                                <Card.Body>
                                    <Card.Title className="board-title">카테고리 : 영어</Card.Title>
                                    <Card.Text className="board-content">{item.title}</Card.Text>
                                    {item.content}<br /><br />
                                    <Button variant="primary" onClick={() => { handleClick(item) }}>게시물 보기</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>

                    <div className="math">
                        {mathData.map((item, index) => (
                            <Card key={index} style={{ width: '18rem', marginBottom: '20px' }}>
                                <Card.Body>
                                    <Card.Title className="board-title">카테고리 : 수학</Card.Title>
                                    <Card.Text className="board-content">{item.title}</Card.Text>
                                    {item.content}<br /><br />
                                    <Button variant="primary" onClick={() => { handleClick(item) }}>게시물 보기</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    <div className="science">
                        {sciData.map((item, index) => (
                            <Card key={index} style={{ width: '18rem', marginBottom: '20px' }}>
                                <Card.Body>
                                    <Card.Title className="board-title">카테고리 : 과학</Card.Title>
                                    <Card.Text className="board-content">{item.title}</Card.Text>
                                    {item.content}<br /><br />
                                    <Button variant="primary" onClick={() => { handleClick(item) }}>게시물 보기</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>

                </div>
            </table>

            {PopupView && clickedData && ( // 이 부분에 clickedData가 존재하는지 확인
                <div className="popup">
                    <div className="popup-content">
                        <h3>제목 : {clickedData.title}</h3>
                        <p>내용 : {clickedData.content}</p>
                        <p>작성자 : {clickedData.memberId}</p>
                        <p>카테고리 : {clickedData.category}</p>
                        <p>등록일자 : {new Date(clickedData.createDate).toLocaleString()}</p>
                        <p>수정일자 : {clickedData.updateDate ? new Date(clickedData.updateDate).toLocaleString() : '날짜 정보 없음'}</p>
                        <button onClick={handleClosePopup}>닫기</button>&nbsp;&nbsp;
                        {(memberId == clickedData.members_Id || memberId === '1') && (
                            <><Link to={`/boardEdit/${clickedData.id}`}>
                                <button>글 수정</button>
                            </Link>
                                &nbsp;
                                <Link to={`/boardDelete/${clickedData.id}`}>
                                    <button>삭제</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main22;
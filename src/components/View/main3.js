import React from "react";

import { useState, useEffect } from "react";

import { Button, Card, Form, InputGroup } from 'react-bootstrap';

import axios from "axios";

import { Link } from "react-router-dom";


import './main4.css'




const Main3 = () => {

    const [clickedData, setClickedData] = useState(null);
    const [PopupView, setPopupView] = useState(false);
    const [data, setData] = useState([

    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true)
        axios.get(`/main3`)
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

    const groupedData = [[], [], [], []]; // 4개의 그룹
    data.forEach((item, index) => {
        const groupIndex = index % 4; // 4로 나눈 나머지를 이용하여 그룹 인덱스 결정
        groupedData[groupIndex].push(item);
    });

    // 각 그룹에 해당하는 데이터를 추출하여 새로운 배열에 저장



    groupedData.forEach((group, index) => {
        console.log(`Group ${index + 1}:`, group);
    });

    console.log(data)
    console.log(groupedData)

    const memberId = sessionStorage.getItem("members_id")

    // 카테고리 분류
    const mathData = data.filter(item => item.category === "math");
    const engData = data.filter(item => item.category === "english");
    const korData = data.filter(item => item.category === "korean");
    const sciData = data.filter(item => item.category === "science");


    return (
        <div className="center_main">

            <section class="notice">
                <div class="page-title">
                    <div class="container">
                        <div className="board-write">
                            {memberId && (
                                <Link to='/boardWrite'>게시글 작성</Link>
                            )}
                        </div>
                    </div>
                </div>

                <div id="board-search">
                    <div class="container">
                        <div class="search-window">
                            최신순 전체 게시글
                        </div>
                    </div>
                </div>

                <div id="board-list">
                    <div class="container">
                        <table class="board-table">
                            {memberId && (
                                <button><Link to='/boardWrite'>게시글 작성</Link></button>
                            )}
                            <tbody>

                                <div className="boardList">

                                    <div className="korean">
                                        {groupedData[0].map((item, index) => (
                                            <Card key={index} style={{ width: '18rem', marginBottom: '20px', height: '15.7rem' }}>
                                                <Card.Body>
                                                    {new Date(item.createDate).toLocaleString()}<br />
                                                    <Card.Title className="board-title"
                                                    >{item.title}</Card.Title>
                                                    <Card.Text className="board-content">카테고리 : 국어</Card.Text>
                                                    <Card.Text className="board-center"
                                                        style={{
                                                            overflow: 'hidden',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                        }}>{item.content}</Card.Text><br />
                                                    <Button variant="primary"
                                                        onClick={() => { handleClick(item) }}
                                                        style={{ position: 'absolute', bottom: "10px", left: '10px' }}>게시물 보기</Button>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                    <div className="english">
                                        {groupedData[1].map((item, index) => (
                                            <Card key={index} style={{ width: '18rem', marginBottom: '20px', height: '15.7rem' }}>
                                                <Card.Body>
                                                    {new Date(item.createDate).toLocaleString()}<br />
                                                    <Card.Title className="board-title">{item.title}</Card.Title>
                                                    <Card.Text className="board-content">카테고리 : 영어</Card.Text>
                                                    <Card.Text className="board-center"
                                                        style={{
                                                            overflow: 'hidden',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                        }}>{item.content}</Card.Text><br />
                                                    <Button variant="primary"
                                                        onClick={() => { handleClick(item) }}
                                                        style={{ position: 'absolute', bottom: "10px", left: '10px' }}>게시물 보기</Button>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="math">
                                        {groupedData[2].map((item, index) => (
                                            <Card key={index} style={{ width: '18rem', marginBottom: '20px', height: '15.7rem' }}>
                                                <Card.Body>
                                                    {new Date(item.createDate).toLocaleString()}<br />
                                                    <Card.Title className="board-title">{item.title}</Card.Title>
                                                    <Card.Text className="board-content">카테고리 : 수학</Card.Text>
                                                    <Card.Text className="board-center"
                                                        style={{
                                                            overflow: 'hidden',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                        }}>{item.content}</Card.Text><br />
                                                    <Button variant="primary"
                                                        onClick={() => { handleClick(item) }}
                                                        style={{ position: 'absolute', bottom: "10px", left: '10px' }}>게시물 보기</Button>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                    <div className="science">
                                        {groupedData[3].map((item, index) => (
                                            <Card key={index} style={{ width: '18rem', marginBottom: '20px', height: '15.7rem' }}>
                                                <Card.Body>
                                                    {new Date(item.createDate).toLocaleString()}<br />
                                                    <Card.Title className="board-title">{item.title}</Card.Title>
                                                    <Card.Text className="board-content">카테고리 : 과학</Card.Text>
                                                    <Card.Text className="board-center"
                                                        style={{
                                                            overflow: 'hidden',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                        }}>{item.content}</Card.Text><br />
                                                    <Button variant="primary"
                                                        onClick={() => { handleClick(item) }}
                                                        style={{ position: 'absolute', bottom: "10px", left: '10px' }}>게시물 보기</Button>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>

                                </div>

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {PopupView && (
                <div className="popup">
                    <div className="popup-content">
                        <h4>제목 : {clickedData.title}</h4><br />
                        <img src={`/upload/${clickedData.storedFileName}`} className="image"/><br/>
                        <p>내용 : {clickedData.content}</p>
                        <p>작성자 : {clickedData.memberId}</p>
                        <p>카테고리 : {clickedData.category}</p>
                        <p>등록일자 : {new Date(clickedData.createDate).toLocaleString()}</p>
                        <p>수정일자 : {clickedData.updateDate ? new Date(clickedData.updateDate).toLocaleString() : '날짜 정보 없음'}</p>
                        <button onClick={handleClosePopup}>닫기</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default Main3
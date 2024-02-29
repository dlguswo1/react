import React from "react";

import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";

import './main1.css'

const Main33 = () => {
    const [clickedData, setClickedData] = useState(null);
    const [PopupView, setPopupView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([

    ]);

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

    const memberId = sessionStorage.getItem("members_id")
    console.log(data)

    return (

        <div>
            <table class="board-table">
                <div className="boardList3">
                    <ul className="card-container">
                        {data.map((data) => (
                            <Card style={{ width: '18rem' }}>
                                <Card.Body style={{position:'relative'}}>
                                    <Card.Title className="board-title">{data.title}</Card.Title><br />
                                    <Card.Text className="board-content">
                                        {data.content}
                                    </Card.Text>
                                    <br/><br/>
                                    <Button variant="primary"
                                    onClick={() => handleClick(data)}
                                    style={{ position: 'absolute', bottom: "10px", left:'10px' }}>게시물 보기</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </ul>
                </div>

                {PopupView && (
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
            </table>
        </div>
    )
}

export default Main33;
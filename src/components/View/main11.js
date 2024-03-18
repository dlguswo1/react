import React, { useEffect, useState } from "react";

//BootStrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import './main1.css'

import { Link } from "react-router-dom";

import axios from 'axios';



function Main11() {
    const [clickedData, setClickedData] = useState(null);
    const [PopupView, setPopupView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([

    ]);

    useEffect(() => {
        setLoading(true)
        axios.get(`/main11`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => setError(err))
    }, [])

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;


    const handleClick = (data) => {
        setClickedData(data);
        setPopupView(true);
    }

    const handleClosePopup = () => {
        setPopupView(false);
    }

    const memberId = sessionStorage.getItem("members_id");


    return (


        <div className="include-carousel">
            <table class="board-table">
                {data.length > 0 && (
                    <Carousel className="carousel"  style={{width:"700px", height:'400px'}} >
                        {data.slice(0, 3).map((item) => (
                            <Carousel.Item>
                                <img src={`/upload/${item.storedFileName}`}
                                className="image"
                                />
                                <Carousel.Caption>
                                    <h3>{item.title}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}

                <div className="board-write">
                    {memberId && (
                        <Link to='/boardWrite'>게시글 작성</Link>
                    )}
                </div>

                <div className="boardList" style={{ cursor: 'Pointer' }}>
                    <ul>
                        {data.map((data) => (
                            <div className="board" onClick={() => handleClick(data)}>
                                <div className="board-title">{data.title}</div>
                                <div className="board-content">{data.content}</div>
                            </div>
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
            </table>
        </div>

    )
}

export default Main11;
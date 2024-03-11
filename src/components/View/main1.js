import React, { useEffect, useState } from "react";

//BootStrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom";

import axios from 'axios';

import './main1.css'



const Main1 = () => {

    const [clickedData, setClickedData] = useState(null);
    const [PopupView, setPopupView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([

    ]);

    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_SERVER_IP}/main1`)
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

    // const accessToken = localStorage.getItem("accessToken")
    const memberId = sessionStorage.getItem("members_id")
    // console.log(accessToken);


    return (
        <div className="center_main">

            <section className="notice">
                <div className="page-title">
                    <div className="container">
                        {data.length > 0 && (
                            <Carousel className="carousel">
                                {data && data.slice(0, 3).map((item) => (
                                    <Carousel.Item>
                                        {item.fileAttached === 1 ? (
                                            <>
                                                <img src={`/upload/${item.storedFileName}`} className="image" />
                                                <br />
                                            </>
                                        ) : (
                                            <p>첨부파일이 없습니다.</p>
                                        )}
                                        <Carousel.Caption>
                                            <h3>{item.title}</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                        {/* {data.length > 0 && (
                            <Carousel className="carousel">
                                {data.slice(0, Math.min(3, data.length)).map((item) => (
                                    <Carousel.Item key={item.id}>
                                        {item.fileAttached === 1 ? (
                                            <><img src={`/upload/${item.storedFileName}`} className="image" /><br /></>
                                        ) : (
                                            <p> 첨부파일이 없습니다.</p>
                                        )}
                                        <Carousel.Caption>
                                            <h3>{item.title}</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )} */}
                    </div>
                </div>

                <div className="under-menu">
                    <div id="board-search">
                        <div class="container">
                            <div class="search-window">
                                최신순 게시글 조회 리스트
                            </div>
                            {memberId && (
                                <button><Link to='/boardWrite'>게시글 작성</Link></button>
                            )}
                        </div>

                    </div>


                    <div id="board-list">
                        <div class="container">
                            <table class="board-table">
                                <thead>
                                    <tr>
                                        <th scope="col" class="th-num">번호</th>
                                        <th scope="col" class="th-title">제목</th>
                                        <th scope="col" class="th-date">등록일</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((data) => (
                                        <tr>
                                            <td>{data.id}</td>
                                            <th onClick={() => handleClick(data)}
                                                style={{ cursor: 'pointer' }}
                                                className="board-title">
                                                {data.title}
                                            </th>
                                            <td>{new Date(data.createDate).toLocaleString()}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {PopupView && (
                <div className="popup">
                    <div className="popup-content">
                        <h4>제목 : {clickedData.title}</h4><br />
                        {clickedData.fileAttached === 1 && (
                            <><img src={`/upload/${clickedData.storedFileName}`} className="image" /><br /></>
                        )}
                        <p>내용 :  {clickedData.content}</p>
                        <p>작성자 : {clickedData.memberId}</p>
                        <p>카테고리 : {clickedData.category}</p>
                        <p>등록일자 : {new Date(clickedData.createDate).toLocaleString()}</p>
                        <p>수정일자 : {clickedData.updateDate ? new Date(clickedData.updateDate).toLocaleString() : '날짜 정보 없음'}</p>
                        <button onClick={handleClosePopup}>닫기</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {(memberId == clickedData.members_Id || memberId === '1') && (
                            <>
                                <Link to={`/boardEdit/${clickedData.id}`}>
                                    <button>글 수정</button>
                                </Link>&nbsp;
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

export default Main1
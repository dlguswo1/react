import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//BootStrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom";

import axios from 'axios';

import './main1.css'



const Main1 = () => {

    const [clickedData, setClickedData] = useState(null);
    const [clickComment, setclickComment] = useState(null);
    const [commentInputVisible, setCommentInputVisible] = useState(false); // 댓글 입력 창 표시 여부
    const [PopupView, setPopupView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([

    ]);

    const { id } = useParams();

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:9999/main1`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => setError(err))
    }, [])

    const submitComment = () => {

        const writer = document.getElementById("commentWriter").value;
        const contents = document.getElementById("commentContents").value;

        // const formData = {
        //     'commentWriter' : writer,
        //     'commentContents' : contents,
        //     'boardId' : clickedData.id
        // };

        // const formData = new FormData();

        // formData.append('commentWriter', writer);
        // formData.append('commentContents', contents);
        // formData.append('boardId', clickedData.id);

        axios.post(`${process.env.REACT_APP_SERVER_IP}/comments`,
            {
                'commentWriter': writer,
                'commentContents': contents,
                'boardId': clickedData.id
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const newComment = res.data;
                setclickComment(prevComments => [...prevComments, newComment]);
            })
            .catch(err => setError(err));
    }

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    // const clickData = () => {
    //     axios.get(`/board/${id}`)
    //     .then(res => {
    //         setClickedData(res.clickData);
    //     })
    //     .catch(err => setError(false))
    // }

    const handleClick = (data) => {
        setClickedData(data);
        setPopupView(true);
        axios.get(`board/${data.id}`)
            .then(res => {
                setclickComment(res.data)
            })
            .catch(err => setError(false))
    }
    console.log(clickComment)

    const handleClosePopup = () => {
        setPopupView(false);
        setCommentInputVisible(false);
    }

    const writeComment = () => {
        setCommentInputVisible(true); // 댓글 입력 창을 표시
    }


    const memberId = sessionStorage.getItem("members_id")
    const token = localStorage.getItem('accesstoken')
    console.log(token)


    return (
        <div className="center_main">

            <section className="notice">
                <div className="page-title">
                    <div className="container">
                        {data.length > 0 && (
                            <Carousel className="carousel">
                                {data && data.slice(0, 3).map((item, index) => (
                                    <Carousel.Item key={index}>
                                        {item.fileAttached === 1 && item.storedFileName ? (
                                            item.storedFileName.map((fileName, idx) => (
                                                <div key={idx}>
                                                    <img src={`${process.env.REACT_APP_SERVER_IP}/upload/${fileName}`} className="image" />
                                                    <br />
                                                </div>
                                            ))
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
                        <h4>제목d : {clickedData.title}</h4><br />
                        {clickedData && clickedData.fileAttached && clickedData.storedFileName && (
                            <>
                                {clickedData.storedFileName.map((fileName, index) => (
                                    <div key={index}>
                                        {fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png') ? (
                                            <div>
                                                <img src={`/upload/${fileName}`} className="image" />
                                                <br />
                                            </div>
                                        ) : (
                                            <div>
                                                {fileName.endsWith('.txt') ? (
                                                    <a href={`/upload/${fileName}`} download>{fileName}</a>
                                                ) : (
                                                    <p>{fileName}</p>
                                                )}
                                                <br />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                        <p>내용 :  {clickedData.content}</p>
                        <p>작성자 : {clickedData.memberId}</p>
                        <p>카테고리 : {clickedData.category}</p>
                        <p>등록일자 : {new Date(clickedData.createDate).toLocaleString()}</p>
                        <p>수정일자 : {clickedData.updateDate ? new Date(clickedData.updateDate).toLocaleString() : '날짜 정보 없음'}</p>

                        {clickComment && (
                            <div>
                                <h2>댓글 목록</h2>
                                <div id="comments">
                                    {clickComment.map(comment => (
                                        <div className="comment">
                                            <div className="writer">작성자 : {comment.commentWriter}</div>
                                            <div className="content">내용 : {comment.commentContents}</div>
                                            <div className="time">작성 시간 : {comment.commentSaveTime}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        {commentInputVisible && (
                            <div>
                                <input type="text" id="commentWriter" placeholder="작성자" />
                                <input type="text" id="commentContents" placeholder="댓글 내용" />
                                <button onClick={submitComment}>댓글 제출</button>
                            </div>
                        )}

                        <br />

                        <button onClick={handleClosePopup}>닫기</button>
                        {(memberId == clickedData.members_Id || memberId === '1') && (
                            <>
                                <button onClick={writeComment}>댓글 작성하기</button>
                                <Link to={`/boardEdit/${clickedData.id}`}>
                                    <button>글 수정</button>
                                </Link>&nbsp;
                                <Link to={`/boardDelete/${clickedData.id}`}>
                                    <button>삭제</button>
                                </Link>
                            </>
                        )}

                        <div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main1
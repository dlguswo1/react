import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//BootStrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Download } from 'react-bootstrap-icons';

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
        axios.get(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/main1`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => setError(err))
    }, [])

    if (loading) return <div>로딩중 xx</div>;
    if (error) return <div>에러가 발생했습니다</div>;

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

        axios.post(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/comments`,
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

        setPopupView(false);
        setCommentInputVisible(false);
    }

    const handleClick = (data) => {
        setClickedData(data);
        setPopupView(true);
        axios.get(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/board/${data.id}`)
            .then(res => {
                setclickComment(res.data)
            })
            .catch(err => setError(false))
    }
    // console.log(clickComment)

    const handleClosePopup = () => {
        setPopupView(false);
        setCommentInputVisible(false);
    }

    const writeComment = () => {
        setCommentInputVisible(true); // 댓글 입력 창을 표시
    }


    const memberId = localStorage.getItem("memberId")
    const token = localStorage.getItem('accesstoken')
    const role = localStorage.getItem('role');
    // console.log(memberId)
    // console.log(token)

    // const cleanedFileNames = data.storedFileName.map(fileName => fileName.replace(/\[|\]/g, ''));
    // console.log(cleanedFileNames)

    // if (clickComment && clickComment.length > 0) {
    //     for (let i = 0; i < clickComment.length; i++) {
    //         const korTime1 = clickComment[i].commentSaveTime[0] + '. ';
    //         const korTime2 = clickComment[i].commentSaveTime[1] + '. ';
    //         const korTime3 = parseInt(clickComment[i].commentSaveTime[2]); // 시간을 정수로 변환
    //         let korTime4 = clickComment[i].commentSaveTime[3] + ':';
    //         const korTime5 = clickComment[i].commentSaveTime[4] + ':';
    //         const korTime6 = clickComment[i].commentSaveTime[5];

    //         // 시간이 12를 넘으면 오후로 변환하고 12를 빼서 24시간제로 변환
    //         if (korTime3 >= 13) {
    //             korTime4 = "오후" + (korTime3 - 12) + ':';
    //         } else {
    //             korTime4 = "오전" + korTime3 + ':';
    //         }

    //         console.log(korTime1 + korTime2 + korTime3 + korTime4 + korTime5 + korTime6)
    //         console.log(korTime2)
    //         console.log(korTime3)
    //         console.log(korTime4)
    //         console.log(korTime5)
    //         console.log(korTime6)
    //     }
    // }
    // else {
    //     // clickComment가 비어 있거나 null일 때 처리할 내용
    //     console.log('clickComment 배열이 비어 있거나 null입니다.');
    // }

    // const newTime1 = clickComment[0].commentSaveTime
    // console.log(newTime1)
    // const newTime2 = clickComment[0].commentSaveTime[0]
    // console.log(newTime2)
    // console.log(clickComment[0].boardId)
    // console.log(clickComment[0].commentWriter)
    console.log(clickComment)

    const formatCommentSaveTime = (commentSaveTime) => {
        if (!commentSaveTime) {
            return ''; // 빈 문자열 또는 다른 값으로 처리
        }

        const year = commentSaveTime[0];
        const month = commentSaveTime[1];
        const day = commentSaveTime[2];
        let hour = commentSaveTime[3];
        const minute = commentSaveTime[4];
        const second = commentSaveTime[5];

        let timePeriod = '오전';

        // 시간이 12를 넘으면 오후로 변경하고 12를 빼줍니다.
        if (hour >= 13) {
            hour -= 12;
            timePeriod = '오후';
        }

        // 시간이 0인 경우 12로 변경합니다.
        if (hour === 0) {
            hour = 12;
        }

        // 시간을 2자리 숫자로 만들어줍니다.
        const formattedHour = ('0' + hour).slice(-2);

        // 날짜 및 시간 형식으로 변환하여 반환
        return `${year}. ${month}. ${day}. ${timePeriod} ${formattedHour}:${minute}:${second}`;
    };

    // const imageFile = '';
    // const storedFileName = clickedData.storedFileName; // data.storedFileName는 파일 이름을 나타내는 문자열이라고 가정합니다.

    // if (storedFileName) {
    //     if (storedFileName.endsWith('.jpg') || storedFileName.endsWith('.jpeg') || storedFileName.endsWith('.png')) {
    //         imageFile = storedFileName; // 이미 선언된 변수를 수정합니다.
    //         console.log('이미지 파일입니다.');
    //     } else {
    //         console.log('이미지 파일이 아닙니다.');
    //     }
    // }

    const imageFiles = [];
    const otherFiles = [];
    const mainImageFiles = [];
    const mainOtherFiles = [];

    // clickedData가 존재하고 storedFileName도 존재하는 경우에만 처리
    if (clickedData && clickedData.storedFileName) {
        clickedData.storedFileName.forEach(fileName => {
            // 확장자를 가져옵니다.
            const extension = fileName.split('.').pop().toLowerCase();

            // 이미지 파일 확장자인 경우
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                imageFiles.push(fileName);
            }
            // 기타 파일 확장자인 경우
            else {
                otherFiles.push(fileName);
            }
        });
    }

    if (data && data.storedFileName) {
        data.storedFileName.forEach(fileName => {
            // 확장자를 가져옵니다.
            const extension = fileName.split('.').pop().toLowerCase();

            // 이미지 파일 확장자인 경우
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                mainImageFiles.push(fileName);
            }
            // 기타 파일 확장자인 경우
            else {
                mainOtherFiles.push(fileName);
            }
        });
    }

    console.log('이미지 파일:', imageFiles);
    console.log('기타 파일:', otherFiles);
    console.log('메인 이미지 파일:', mainImageFiles);
    console.log('메인 기타 파일:', mainOtherFiles);



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
                                            <div>
                                                {item.storedFileName.some(fileName =>
                                                    fileName.toLowerCase().endsWith('.jpg') ||
                                                    fileName.toLowerCase().endsWith('.jpeg') ||
                                                    fileName.toLowerCase().endsWith('.png')) ? (
                                                    <img src={`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/upload/${item.storedFileName.find(fileName =>
                                                        fileName.toLowerCase().endsWith('.jpg') ||
                                                        fileName.toLowerCase().endsWith('.jpeg') ||
                                                        fileName.toLowerCase().endsWith('.png'))}`} className="image" />
                                                ) : (
                                                    <p>이미지 파일이 없습니다.</p>
                                                )
                                                }
                                                <br />
                                            </div>
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
                        {/* {clickedData && clickedData.fileAttached && clickedData.storedFileName && (
                            <>
                                {clickedData.storedFileName.map((fileName, index) => (
                                    <div key={index}>
                                        {fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png') ? (
                                            <div>
                                                <img src={`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/upload/${fileName}`} className="image" />
                                                <br />
                                            </div>
                                        ) : (
                                            <div>
                                                {fileName.endsWith('.txt') ? (
                                                    <a href={`${process.env.REACT_APP_SERVER_IP}/upload/${fileName}`} download>{fileName}</a>
                                                ) : (
                                                    <p>{fileName}</p>
                                                )}
                                                <br />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )} */}
                        {imageFiles.map((fileName) => (
                            <div>
                                <br />
                                <img src={`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/upload/${fileName}`} className="image" />
                            </div>
                        ))}
                        <p>내용 :  {clickedData.content}</p>
                        <p>작성자 : {clickedData.memberId}</p>
                        <p>카테고리 : {clickedData.category}</p>
                        <p>등록일자 : {new Date(clickedData.createDate).toLocaleString()}</p>
                        <p>수정일자 : {clickedData.updateDate ? new Date(clickedData.updateDate).toLocaleString() : '날짜 정보 없음'}</p>

                        {otherFiles.map((fileName, index) => {
                            const cleanedFileName = fileName.replace(/^\d+_/, ""); // 숫자 제거
                            return (
                                <div key={index} className="otherFiles" fileName={cleanedFileName} value={cleanedFileName}>
                                    <br />
                                    <a href={`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/download/${fileName}`} download>{cleanedFileName} <Download/></a>
                                    
                                </div>
                            );
                        })}


                        <br />
                        {clickComment && (
                            <div>
                                <h2>댓글 목록</h2>
                                <div id="comments">
                                    {clickComment.map(comment => (
                                        <div className="comment">
                                            <div className="writer">작성자 : {comment.commentWriter}</div>
                                            <div className="content">내용 : {comment.commentContents}</div>
                                            <div className="time">작성 시간 : {formatCommentSaveTime(comment.commentSaveTime)}</div>
                                            {(memberId == comment.commentWriter || role === 'ROLE_ADMIN') && (
                                                <div>
                                                    <br />
                                                    <Link to={`/commentDelete/${comment.id}`}>
                                                        <button>삭제</button>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        {commentInputVisible && (
                            <div>
                                <input type="text" id="commentWriter" placeholder="작성자" value={memberId} />
                                <input type="text" id="commentContents" placeholder="댓글 내용" />
                                <button onClick={submitComment}>댓글 제출</button>
                            </div>
                        )}

                        <br />

                        <button onClick={handleClosePopup}>닫기</button>
                        {(memberId && (
                            <button onClick={writeComment}>댓글 작성하기</button>
                        ))}
                        {(memberId == clickedData.memberId || role === 'ROLE_ADMIN') && (
                            <>
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
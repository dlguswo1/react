import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import Main1 from "../components/View/main1";
import Main2 from '../components/View/main2';
import Main3 from '../components/View/main3';

import './admin.css'

const Admin = () => {
    const navigateUrl = useNavigate();
    const [mainPage, setMainPage] = useState('main1');

    const handleButtonClick = (page) => {
        // 버튼 클릭 시 메인 페이지 설정
        setMainPage(page);
        alert("페이지 설정 되었습니다.");
        navigateUrl('/');
    };

    const memberId = sessionStorage.getItem("members_id");
    const isAdministrator = sessionStorage.getItem("members_id") === "1";
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);

    if (memberId !== "1") {
        return navigate("/")
    }

    // + 버튼을 클릭할 때마다 새 페이지를 추가하는 함수
    const addPage = () => {
        const newPage = {
            // 여기에 새 페이지의 정보를 넣으세요. 예를 들어, 제목(title) 등
            title: `새 페이지 ${pages.length + 4}`,
            content: "",
            count: `${pages.length + 4}`
        };
        setPages([...pages, newPage]);
    };

    const handleContentChange = (index, value) => {
        const updatedPages = [...pages];
        updatedPages[index].content = value;
        setPages(updatedPages);
    };

    return (
        <div>
            <main className="mt-5 pt-5" />
            <div className="mypage-wrap">
                <div className="user-welcome">
                    <h2>관리자 페이지</h2>
                </div>

                <Row className="justify-content-center">
                    <Col className="text-center">
                        <ButtonGroup aria-label="Basic example">
                            <button onClick={() => handleButtonClick('main1')}>Main1으로 설정</button>
                            <button onClick={() => handleButtonClick('main2')}>Main2으로 설정</button>
                            <button onClick={() => handleButtonClick('main3')}>Main3으로 설정</button>
                            {pages.map((page, index) => (
                                <Link to="/main3"><Button variant="secondary">페이지 {page.count}</Button></Link>
                            ))}
                            <Button variant="secondary" onClick={addPage}>+</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <br />

                <div className="show-user">
                    <div className="title">
                        <ul>
                            <li>
                                <h3>페이지 1</h3>
                            </li>
                            <li><a>페이지 1입니다.</a></li>
                        </ul>
                    </div>
                    <div className="content">
                        <Main1 />
                    </div>
                </div>

                <div className="user-edit">
                    <div className="title">
                        <ul>
                            <li>
                                <h3>페이지 2</h3>
                            </li>
                            <li><a>페이지 2입니다.</a></li>
                        </ul>
                    </div>
                    <div className="content">
                        <Main2 />
                    </div>
                </div>

                <div className="user-edit">
                    <div className="title">
                        <ul>
                            <li>
                                <h3>페이지 3</h3>
                            </li>
                            <li><a>페이지 3입니다.</a></li>
                        </ul>
                    </div>
                    <div className="content">
                        <Main3 />
                    </div>
                </div>
            </div>

            <hr />

            {pages.map((page, index) => (
                <Row key={index} className="justify-content-center">
                    <Col className="text-center">
                        <h2>{page.title}</h2>
                        <h5> 새로 입력할 내용</h5>
                        <textarea
                            value={page.content}
                            onChange={(e) => handleContentChange(index, e.target.value)}
                            rows={4}
                            cols={50}
                            placeholder="내용을 입력하세요..."
                        />
                    </Col>
                </Row>
            ))}

        </div>
    )
}

export default Admin
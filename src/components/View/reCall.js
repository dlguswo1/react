import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const Recall = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (window.location.pathname.startsWith('/commentDelete')) {
        axios.get(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/commentDelete/${id}`)
            .then((res)=>{
                alert("댓글 삭제 성공")
                navigate('/');
            })
            .catch(err => {
                alert("댓글 삭제 실패")
                navigate('/');
            });
    } else if (window.location.pathname.startsWith('/boardDelete')) {
        axios.get(`${process.env.REACT_APP_SERVER_IP}/${process.env.REACT_APP_SERVER_NAME}/boardDelete/${id}`)
            .then((res)=>{
                alert("게시글 삭제 성공")
                navigate('/');
            })
            .catch(err => {
                alert("게시글 삭제 실패")
                navigate('/');
            });
    }

    return null;
}

export default Recall;
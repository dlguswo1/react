import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


const Recall = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    axios.get(`/boardDelete/${id}`)
    .then((res)=>{
        alert("삭제 성공")
        navigate('/');
    })
    .catch(err => {
        alert("삭제 실패")
    })

    return (
        <div>
            
        </div>
    )
}

export default Recall
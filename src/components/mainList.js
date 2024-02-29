import React from "react";

import { Link } from "react-router-dom";
import { useState } from "react";

const MainList = () => {

    return (
        <div>
            <Link to='main1'>메인 1으로 넘어가기</Link><br />
            <Link to='main2'>메인2</Link><br />
            <Link to='main3'>메인3</Link>
        </div>
    )
}

export default MainList;
import { React } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import axios from 'axios';


const Header = (props) => {

    const logOut = () => {
        axios.get(`${process.env.REACT_APP_SERVER_IP}/logoutReact`,
        { headers : {
            'Authorization' : `Bearer ${token}`
        }})
        .then(() => {
            sessionStorage.clear();
            localStorage.clear();
            document.location.href = "/";
        })
        .catch(err => console.log(err))
    }

    const token = localStorage.getItem('accesstoken');

    const isLogin = sessionStorage.getItem("isLogin") === "true";
    const isAdministrator = sessionStorage.getItem("members_id") === "1";
    

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-primary nav fw-bolder header" data-bs-theme="dark" style={{ height: '50px' }}>
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav>
                        {(props.isLogin === true) ? (
                            <>
                                <Nav.Link onClick={logOut}>로그아웃</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link><Link to='/login'>로그인</Link></Nav.Link>
                                <Nav.Link><Link to='/join'>회원가입</Link></Nav.Link>
                            </>
                        )}
                        {isAdministrator && <Nav.Link><Link to='/admin'>관리자 페이지 이동</Link></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;
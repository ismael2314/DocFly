import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UserFooter = () => {



    return (
        <footer className=" bg-light bg-gradient border">
            <Container>
                <Row className="d-flex flex-column align-items-center text-center">
                    <div className="col-12 col-md-6 col-lg-2  flex-shrink p-1 d-flex align-items-center bg-dark rounded-bottom text-light justify-content-center">
                        <span className="display-6 fw-bold p-2">DocFly</span>
                    </div>
                    <div className="col-12 col-md-6 col-lg-8 align-items-center justify-content-center d-flex ">
                        <ul className="d-flex flex-row nav">
                            <li className="nav-item"><Link to="/about" className="nav-link">About us</Link></li>
                            <li className="nav-item"><Link to="/about" className="nav-link">Developers</Link></li>
                            <li className="nav-item"><Link to="/about" className="nav-link">Contact us</Link></li>
                            <li className="nav-item"><Link to="/about" className="nav-link">Help</Link></li>
                        </ul>
                    </div>
                    <div className="col-12 text-center">
                        <p className="form-text text-secondary">Copyright &copy; 2024 All rights reserved | DocFly.com </p>
                    </div>
                </Row>
            </Container>
        </footer>


    )
}

export default UserFooter;
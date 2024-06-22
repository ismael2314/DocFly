import React from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Spinner } from "react-bootstrap";

const Login = () => {
    let formHandler=(event)=>{
        event.preventDefault()
        console.log('Form submited !'+event)
        console.log(event)
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div style={{height:'fit-content'}} className="border  shadow shadow-sm  pb-4  col-8 col-lg-4 bg-light text-center rounded" >
                
                    
                    <h1 className="display-5 fw-bold p-2 w-100 text-center">Login</h1>
                <hr className="shadow shadow-sm"></hr>
                <Form className=" p-2  gap-3 text-start" onSubmit={formHandler} autoComplete="autoComplete" >
                    <div className="text-left mb-2">
                        <Form.Label >User Name</Form.Label>
                        <Form.Control type="text" placeholder="User name" />
                    </div>
                    <div>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" className="mb-2" />
                        <Link to="/forgotPassword" >ForgotPassword</Link>?
                    </div>
                    <Stack direction="horizontal" className="mt-2">
                        <Button type="submit" className="w-100 d-flex justify-content-evenly">
                            <Spinner className="visually-hidden fs-6"></Spinner>
                            Login</Button>
                    </Stack>
                    <div className="border border-bottom-0 mt-2">

                    </div>

                </Form>
                <Link to="/sign" className="p-2">I don't have an account.</Link>
            </div>
        </Container>
    )
}

export default Login
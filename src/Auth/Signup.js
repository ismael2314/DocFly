import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Sign = () => {
    const [signIn, setSignIn] = useState('');

    let formHandler = (event) => {
        event.preventDefault()
        console.log('Form submited !')
        setSignIn(true)
    }
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div style={{ height: 'fit-content' }} className="border  shadow shadow-sm  pb-4  col-8 col-lg-4 bg-light text-center rounded" >
                <div className="">
                    <h1 className="display-5 fw-bold p-2 w-100 text-center">Signup</h1>
                    <hr></hr>
                    <Form className=" p-2 gap-3 text-start" onSubmit={formHandler}>
                        <div className="text-left mb-2">
                            <Form.Label >User Name</Form.Label>
                            <Form.Control type="text" placeholder="User name" />
                        </div>
                        <div className="text-left mb-2">
                            <Form.Label >E-mail</Form.Label>
                            <Form.Control type="email" placeholder="E-Mail" />
                        </div>
                        <div>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" className="mb-2" />
                            {/* password making guidlines */}
                        </div>
                        <div>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" className="mb-2" />
                            {/* confirmation for the password match */}
                        </div>
                        <Stack direction="horizontal" className="mt-2">
                            <Button type="submit" className="w-100">Signup</Button>
                        </Stack>
                        <hr></hr>

                    </Form>
                    <Link to="/" className="p-2">I have an account.</Link>
                </div>

                {signIn && (<p className="alert alert-success col-lg-6 p-2 text-center d-flex justify-content-center w-100 ">
                    <span className=""></span>
                    We have sent you an E-mail,
                </p>)
                }
                {
                    signIn && (<p className="alert alert-danger col-lg-6 p-2 text-center d-flex justify-content-center w-100 ">
                        <span className=""></span>
                        Error has happened! please try again.
                    </p>)
                }


            </div>
        </Container>
    )
}

export default Sign
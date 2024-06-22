import React from "react";
import { Card, Container } from "react-bootstrap";
import './datalist.css'

const Dashbord = () => {


    return (
        <Container className="my-3 w-100 " >
            <h2>Dashboard</h2>
            <hr></hr>
            <div style={{ height: '409px',width:'100%',overflowX:'auto' }}>
            <div className="Row d-flex justify-content-center gap-2">
                <Card className="col-9 col-md-3">
                    <Card.Header>
                        <span> Documents</span>
                    </Card.Header>
                    <Card.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ut diam venenatis dapibus sed id justo. Vivamus venenatis faucibus pellentesque. Aenean nulla urna, pretium vitae libero et, consequat rhoncus eros. Integer ante leo, varius quis libero in, maximus tristique risus. </p>

                    </Card.Body>
                </Card>

                <Card className="col-9 col-md-3">
                    <Card.Header>
                        <span> Documents</span>
                    </Card.Header>
                    <Card.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ut diam venenatis dapibus sed id justo. Vivamus venenatis faucibus pellentesque. Aenean nulla urna, pretium vitae libero et, consequat rhoncus eros. Integer ante leo, varius quis libero in, maximus tristique risus. </p>

                    </Card.Body>
                </Card>

                <Card className="col-9 col-md-3">
                    <Card.Header>
                        <span> Documents</span>
                    </Card.Header>
                    <Card.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ut diam venenatis dapibus sed id justo. Vivamus venenatis faucibus pellentesque. Aenean nulla urna, pretium vitae libero et, consequat rhoncus eros. Integer ante leo, varius quis libero in, maximus tristique risus. </p>

                    </Card.Body>
                </Card>
            </div>
            </div>
            
        </Container>
    )
}


export default Dashbord
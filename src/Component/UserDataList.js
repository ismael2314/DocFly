
import React, { useEffect, useState } from "react";
import { Container, Button, Table, Stack, Modal, Form, FormGroup, FormLabel, Dropdown, Alert } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import SplitButton from 'react-bootstrap/SplitButton';

import './datalist.css'
const UserDataList = () => {

    if(localStorage.getItem('user')===null){
        localStorage.setItem('user',crypto.randomUUID())
    }
    const [show, setShow] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showconfirmDel, setconfirmDel] = useState(false)

    const [dname, setDname] = useState('');
    const [dfile, setDfile] = useState('');
    const [dother, setDother] = useState(0);
    

    const [load, setLoad] = useState(true);
    const [list, setList] = useState([]);

    const [docId, setDocId] = useState('');

    const loadList = (show) => {
        fetch('http://localhost:7889/api/document/list?user='+localStorage.getItem('user'), {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            setList(data)
            setLoad(false);
        }).catch(() => {
            
        })
    }
    useEffect(() => {
        loadList(false)
    }, [])
    ///////////////////////////////////////////
    const handleClose = () => {
        setShow(!show)
    }

    const handelSubmitReg = (event) => {
        event.preventDefault()
        console.log('Registered!')
        setShow(!show)
        let formdata = new FormData(document.querySelector("#regForm"))
        let object = {}

        formdata.forEach((value, key) => {
            if (key.localeCompare('dname') && key.localeCompare('dfile')) {
                object[key] = value;

            }
        });

        fetch('http://localhost:7889/api/document/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Document: {
                    name: dname,
                    file: dfile,
                    user: localStorage.getItem('user'),
                    other: object
                }
            })

        }).then((res) => {
            return (res.json())
        }).then((data) => {
            loadList(false)
            console.log(data)
        })



    }

    const handleDetail = (event) => {

        if (event !== undefined) {
            const docInfo = event.target.getAttribute('aria-label')
            console.log(JSON.parse(docInfo).dother)
            setDocId(JSON.parse(docInfo))
        }
        setShowDetail(!showDetail)
    }

    const handelUpdate = (event) => {

        if (event !== undefined) {
            const docInfo = event.target.getAttribute('aria-label')
            setDocId(JSON.parse(docInfo))

        }

        setShowUpdate(!showUpdate)
    }
    const handelUpdateForm = (event) => {
        event.preventDefault()

        const object = {
            id: docId.din,
            name: dname,
            file: dfile,
            user: localStorage.getItem('user')
        }
        fetch('http://localhost:7889/api/document/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Document: object
            })

        }).then((res) => {
            return (res.json())
        }).then((data) => {
            loadList(false)
            console.log(data)
        }).catch(()=>{

        })

        setShowUpdate(!showUpdate)
    }
    const handleDelete = (event) => {
        if (event !== undefined) {
            const docInfo = event.target.getAttribute('aria-label')
            setDocId(JSON.parse(docInfo))
        }
        setconfirmDel(!showconfirmDel)
    }
    const handleDeleteReq = ()=>{
        fetch('http://localhost:7889/api/document/del', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Document: {
                    id:docId.din,
                    user: localStorage.getItem('user'),
                }
            })

        }).then((res) => {
            return (res.json())
        }).then((data) => {
            loadList(false)
            console.log(data)
        }).catch(()=>{

        })

        setconfirmDel(!showconfirmDel)
    }

    const handleInputAdditional = (event) => {
        setDother(dother + 1)
        let parent = document.getElementById('stack-info')
        let div = document.createElement('div');
        let divInput = document.createElement('div')
        let title = document.createElement('input')
        let value = document.createElement('textarea')



        title.classList.add('form-control', 'form-control-sm')
        value.classList.add('form-control', 'form-control-sm')
        title.placeholder = 'Title'
        title.name = dother + '_title'
        value.placeholder = 'Value'
        value.rows = 1
        value.name = dother + '_value'


        divInput.appendChild(title)
        divInput.appendChild(value)
        divInput.classList.add('d-flex', 'flex-row', 'gap-2', 'my-1')
        div.appendChild(divInput)
        parent.appendChild(div)
    }


    const otherInfoOrgnize = items => {
        
        let cin = {}
        for (let title in items) {
            console.log(title)
            for (let value in items) {
                if (title.search(value.split('_')[0]) === 0 && title.match('title') && value.match('value')) {
                    cin[items[title]] = items[value]
                }

            }
        }
        return cin;
    };


    const otherInfoList = items => {
        let content = [];
        let cin = otherInfoOrgnize(items)

        for (let title in cin) {
            console.log(cin)
            content.push(
                <p className="fs-6 ps-5 border p-2 rounded d-flex justify-content-between ">
                    <span className="fw-bold"><i class="fa-solid fa-key fa-2xs"></i> {title}</span>
                    <span><i class="fas fa-sticky-note fa-sm"></i> {cin[title]}</span>
                </p>
            )
        }
        return content;
    };

    return (
        <Container className="my-3">
            <h2>Documents</h2>
            <hr></hr>
            <Container className="my-1 d-flex align-items-center gap-2 justify-content-start flex-row-reverse">
                <div>
                    <Button type="submit" className="btn-sm bg-gradient" onClick={handleClose}><i className="fa fa-plus-circle px-2"></i>Create / Recored</Button>
                </div>
                <Form className="col-6 col-md-3 my-2">
                    <FormGroup className="border rounded d-flex align-items-center bg-white">
                        <Form.Control type="search" size="sm" placeholder="Search" className="border-0"></Form.Control>
                        <i className="fa fa-search px-2"></i>
                    </FormGroup>
                </Form>
            </Container>

            <Modal show={load} className="align-items-center align-self-center">
                <Modal.Body className="text-center">
                    <h1 className="fa fa-spinner fa-pulse display-1"> </h1>
                </Modal.Body>
            </Modal>
            {
                list.length > 0 ? <div>
                    <Container id='filters' className="">

                        <Table hover bordered>
                            <thead className="table-secondary">
                                <tr>
                                    <th>#</th>
                                    <th>Document</th>
                                    
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((value, index = 1) =>
                                    <tr key={value.din}>
                                        <td>{++index}</td>
                                        <td>{value.name}</td>
                                        
                                        <td>
                                            <div>
                                                {[SplitButton].map((DropdownType, idx) => (
                                                    <DropdownType
                                                        as={ButtonGroup}
                                                        key={idx}
                                                        id={`dropdown-button-drop-${idx}`}
                                                        size="sm"
                                                        variant="light"
                                                        title="Action"
                                                        className="border"
                                                    >

                                                        <Dropdown.Item onClick={handelUpdate} aria-label={JSON.stringify({
                                                            din: value.din,
                                                            dname: value.name,
                                                            dfile: value.file,
                                                            ddescription: value.description,
                                                            drecored: "",
                                                            drecoredBy: ""
                                                        })}>Update</Dropdown.Item>
                                                        <Dropdown.Item className="bg-danger text-white" onClick={handleDelete} aria-label={JSON.stringify({
                                                            din: value.din,
                                                            dname: value.name,
                                                            dfile: value.file,
                                                            ddescription: value.description,
                                                            drecored: "",
                                                            drecoredBy: ""
                                                        })} >Delete</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item href="" onClick={handleDetail} aria-label={JSON.stringify({
                                                            din: value.din,
                                                            dname: value.name,
                                                            dfile: value.file,
                                                            ddescription: value.description,
                                                            drecored: value.recorededOn,
                                                            drecoredBy: value.recoredBy,
                                                            dother: value.other
                                                        })}>Detail</Dropdown.Item>
                                                    </DropdownType>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                    : <div className="d-flex flex-column align-items-center justify-content-center text-center text-secondary" style={{height: '370px',overflowY:'auto'}}>
                        <p className="h1">
                            Empty
                        </p>
                        <p>Click the <code><i className="fa fa-plus-circle px-2"></i>Create / Recored</code> button to start</p>
                    </div>
            }
            {/* Document Register */}
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handelSubmitReg} id="regForm">
                    <Modal.Header closeButton>
                        <Modal.Title>Recored</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="gap-2 d-flex flex-column">
                        <FormGroup>
                            <FormLabel>Document Name</FormLabel>
                            <Form.Control name="dname" type="text" placeholder="eg: File 1, Letter from OSS" size="sm" value={dname} onChange={(e) => {
                                setDname(e.target.value)
                            }}></Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Upload</FormLabel>
                            <Form.Control name="dfile" type="File" placeholder="eg: File 1, Letter from OSS" size="sm" onChange={(e) => {
                                setDfile(e.target.files[0])
                            }}></Form.Control>
                        </FormGroup>

                        <Stack direction="horizontal" className="my-2">
                            <Button type="button" className=" btn-sm " onClick={handleInputAdditional}><i className="fa fa-plus px-2"></i></Button>
                        </Stack>
                        <Stack id="stack-info" direction="vertical" className="h-50 overflow-auto">

                        </Stack>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} size="sm">
                            Close
                        </Button>
                        <Button variant="primary" type="submit" size="sm">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Document Update */}
            <Modal show={showUpdate} onHide={handelUpdate}>
                <Form onSubmit={handelUpdateForm}>
                    <Modal.Header >
                        <Modal.Title>Update Recored</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <FormGroup>
                            <FormLabel>Document Id</FormLabel>
                            <Form.Control readOnly plaintext className="fw-bolder text-danger" type="text" placeholder="eg: File 1, Letter from OSS" value={docId.din}   ></Form.Control>

                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Document Name</FormLabel>
                            <Form.Control type="text" placeholder="eg: File 1, Letter from OSS" name="dname" value={dname} onChange={(e) => {
                                setDname(e.target.value)
                            }}></Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Upload</FormLabel>
                            <Form.Control type="File" placeholder="eg: File 1, Letter from OSS" name="file" onChange={(e) => {
                                setDfile(e.target.files[0])
                            }}></Form.Control>
                        </FormGroup>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" size="sm">
                            Save Changes and Exit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Document Detail */}
            <Modal show={showDetail} onHide={handleDetail}>
                <Modal.Body  style={{width:'100%'}}>

                    <FormGroup>
                        <FormLabel className="fw-bold">Document ID <i className="fa-solid fa-circle-exclamation fa-xs ps-1"></i></FormLabel>
                        <p>{docId.din}</p>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel className="fw-bold">Document Name</FormLabel>
                        <p>{docId.dname}</p>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel className="fw-bold">Description</FormLabel>
                        <p>{docId.ddescription}</p>
                    </FormGroup>
                    <FormGroup className="d-flex flex-column">
                        <FormLabel className="fw-bold">Uploaded File</FormLabel>
                        <Link to="/u/fileid" target="_blank">{JSON.stringify(docId.dfile)}</Link>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel className="fw-bold">is Changed</FormLabel>
                        <p>Checksum</p>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel className="fw-bold">Other</FormLabel>
                        <div className="d-flex flex-column col-12 justify-self-end">
                            <p>{otherInfoList(docId.dother)}</p>
                        </div>

                    </FormGroup>
                    <FormGroup>
                        <FormLabel className="fw-bold">Uploaded By</FormLabel>
                        <p>{docId.drecoredBy}<span className="fw-bold px-2">on</span><code>{docId.drecored}</code></p>
                    </FormGroup>


                </Modal.Body>


            </Modal>
            {/* Delete Confirmation */}
            <Modal show={showconfirmDel} onHide={handleDelete}>
                <Form>
                    <Modal.Body>

                        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
                            <span className="fa fa-exclamation-triangle display-3"></span>
                            <span>
                                Are you sure you want to delete the recored!<br />
                                <span className="fw-bold">Note : this process can not be revesed</span>
                                <hr />
                                <span><b>DocID</b> : {docId.din}</span><br />
                                <span><b>File</b> :  {docId.dname}</span><br />

                            </span>

                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" size="sm" onClick={handleDeleteReq} aria-label={JSON.stringify({
                            din: docId.din,
                            dname: docId.name,
                            dfile: docId.file,
                            ddescription: docId.description,
                            drecored: docId.recorededOn,
                            drecoredBy: docId.recoredBy
                        })}>
                            Yes Delete
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )

}

export default UserDataList 
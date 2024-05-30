import generateUniqueId from 'generate-unique-id';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Header from '../Header/Header'


function AddData() {
    const [inputState, setInputState] = useState({
        id: '',
        fname: '',
        lname: '',
        email: '',
        address: '',
        phone: ''
    });

    const [viewData, setviewData] = useState([]);


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputState({ ...inputState, [name]: value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputState.id) {

            let record = viewData;
            let updateData = record.map((rec) => {
                if (rec.id == inputState.id) {
                    return rec = inputState
                }
                else {
                    return rec
                }
            })
            setviewData(updateData);
        } else {
            if (inputState !== '') {

                let obj = {
                    ...inputState,
                    id: generateUniqueId({ length: 4, useLetters: false })

                }
                setviewData([...viewData, obj]);
                console.log('obj', obj);
            }
        }

        console.log('input', inputState);


        setInputState({
            id: '',
            fname: '',
            lname: '',
            email: '',
            address: '',
            phone: ''
        })


    }

    const handleEdit = (id) => {
        let record = viewData;
        let singleRec = record.filter((rec) => {
            return rec.id == id;
        })
        setInputState(singleRec[0]);
    }

    const handleDelete = (id) => {
        let record = viewData;
        let deleteRec = record.filter((rec) => {
            return rec.id !== id;
        })
        setviewData(deleteRec)
    }

    return (
        <>
            <Container className='m-auto'>
                <Header />

                <div className="row  ps-5">
                    <div className='d-flex justify-content-center form'>

                        <div className="col6 p-3">
                            <div className=' head '>
                                <h5 className='text-white p-3'>New Employee</h5>
                            </div>
                            <Form onSubmit={handleSubmit} className='p-3 '>
                                <Form.Control type="text" value={inputState.id} name='id' hidden />



                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'>
                                    <Form.Label className='d-flex'>
                                        First Name
                                    </Form.Label>
                                    <Form.Control type="text" onChange={handleInput} value={inputState.fname} name='fname' />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'>
                                    <Form.Label className='d-flex'>
                                        Last Name
                                    </Form.Label>
                                    <Form.Control type="text" onChange={handleInput} value={inputState.lname} name='lname' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'>
                                    <Form.Label className='d-flex'>
                                        Email Id
                                    </Form.Label>
                                    <Form.Control type="email" onChange={handleInput} value={inputState.email} name='email' />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail" className='d-flex p-1 fs-6'>
                                    <Form.Label className='d-flex'>
                                        Address
                                    </Form.Label>
                                    <Form.Control as="textarea" aria-label="With textarea" onChange={handleInput} value={inputState.address} name='address' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity" className='d-flex p-1 fs-6'>
                                    <Form.Label className='d-flex'>
                                        Phone
                                    </Form.Label>
                                    <Form.Control type="text" onChange={handleInput} value={inputState.phone} name='phone' />
                                </Form.Group>

                                <Button className='btn btn-success' type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>

                </div>
            </Container>
            <hr />
            <hr />


            <Container className=''>
                <div className='p-2 d-flex head  text-light justify-content-between '>
                    <h4 className='p-1 m-0'>Employee Management</h4>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viewData.map((data) => {
                                return (
                                    <>
                                        <tr>
                                            {/* <td>{data.id}</td> */}
                                            <td>{data.fname}</td>
                                            <td>{data.lname}</td>
                                            <td>{data.email}</td>
                                            <td>{data.address}</td>
                                            <td className='d-flex justify-content-around'>
                                                <button type='submit' className='btn text-primary' ><i className="bi bi-eye-fill fs-4"></i></button>
                                                <button type='submit' className='btn text-warning' onClick={() => handleEdit(data.id)}><i className="bi bi-pencil-square fs-4"></i></button>
                                                <button type='submit' className='btn text-danger' onClick={() => handleDelete(data.id)}><i className="bi bi-trash3 fs-4"></i></button>
                                            </td>

                                        </tr>
                                    </>

                                )
                            })
                        }

                    </tbody>
                </Table>
                <Row>

                </Row>
            </Container>




        </>
    )
}

export default AddData


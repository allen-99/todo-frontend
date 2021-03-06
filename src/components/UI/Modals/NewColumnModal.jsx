import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap'
import {Button, InputGroup, FormControl, FloatingLabel, Form} from 'react-bootstrap';

const NewColumnModal = (props) => {

    const [newColumn, setNewColumn] = useState('')

    const addNewColumn =  (e) => {
        e.preventDefault()
        const a = document.getElementById('name')
        if (newColumn === '') {
            a.className += ' is-invalid'
        }
        else {
            a.className = 'form-control';
            props.newColumnAdd(newColumn)
            setNewColumn('')
            props.onHide()
        }


    }
    return (
         <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить колонку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    label="Название группы"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  id='name'
                                  value={newColumn}
                                  onChange={e => setNewColumn(e.target.value)}
                                  placeholder="To Do"/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addNewColumn}>Добавить</Button>
                <Button variant="secondary" onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewColumnModal;
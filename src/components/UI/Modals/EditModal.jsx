import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap'
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import moment from 'moment'

const EditModal = (props) => {

    const AddNewMessage = (e) => {

        e.preventDefault()

        let a = document.getElementById('header')
        if (props.oldTodo.header === '') {
            a.className += ' is-invalid'
        } else {
            a.className = 'form-control';

            let date_b = document.getElementById('date_begin')
            let date_e = document.getElementById('date_end')
            let equal = 0

            if (props.oldTodo.date_begin !== '' && (!moment(props.oldTodo.date_begin, "DD.MM.YYYY", true).isValid())) {
                date_b.className += ' is-invalid'
            } else {
                date_b.className = 'form-control';
                equal++
            }
            if (props.oldTodo.date_end !== '' && (!moment(props.oldTodo.date_end, "DD.MM.YYYY", true).isValid())) {
                date_e.className += ' is-invalid'

            } else {
                date_e.className = 'form-control';
                equal++
            }

            if (equal === 2 && props.oldTodo.date_begin !== '' && props.oldTodo.date_end !== '') {
                const [day_b, month_b, year_b] = props.oldTodo.date_begin.split('.')
                const [day_e, month_e, year_e] =props.oldTodo.date_end.split('.')

                const date_begin_correct_format = year_b + '-' + month_b + '-' + day_b
                const date_end_correct_format = year_e + '-' + month_e + '-' + day_e

                if (Date.parse(date_begin_correct_format) > Date.parse(date_end_correct_format)) {
                    date_e.className += ' is-invalid'
                    date_b.className += ' is-invalid'
                    equal = 3
                }
            }
            if ((props.oldTodo.date_begin === '' || props.oldTodo.date_end === '') && equal !== 3) {
                date_b.className = 'form-control';
                date_e.className = 'form-control';
                props.newMessage(props.oldTodo)
                props.onHide()
            } else {
                if (!(date_b.classList.contains('is-invalid')) && !(date_e.classList.contains('is-invalid'))) {
                    props.newMessage(props.oldTodo)
                    props.onHide()
                }

            }

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
                    Изменить задачу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    label="Название задачи"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  id='header'
                                  value={props.oldTodo.header}
                                  onChange={e => props.setOldTodo({...props.oldTodo, header: e.target.value})}
                                  placeholder="Купить молоко"/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Место"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  value={props.oldTodo.place}
                                  onChange={e => props.setOldTodo({...props.oldTodo, place: e.target.value})}
                                  placeholder="ДВФУ"/>
                </FloatingLabel>
                <FloatingLabel
                    label="Описание задачи"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  placeholder="Купить очень много молока в магазине"
                                  as="textarea"
                                  value={props.oldTodo.text}
                                  onChange={e => props.setOldTodo({...props.oldTodo, text: e.target.value})}
                                  style={{height: '100px'}}/>
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  aria-label="12.11.2020"
                                  value={props.oldTodo.date_begin}
                                  id='date_begin'
                                  onChange={e => props.setOldTodo({...props.oldTodo, date_begin: e.target.value})}
                                  placeholder="Дата начала"/>

                </FloatingLabel>
                <FloatingLabel
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  aria-label="12.11.2020"
                                  value={props.oldTodo.date_end}
                                  id='date_end'
                                  onChange={e => props.setOldTodo({...props.oldTodo, date_end: e.target.value})}
                                  placeholder="Дата окончания"/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingSelect"
                    label="Выберите тег">
                    <Form.Select aria-label="Выбрать тэг"
                                 value={props.oldTodo.tag_id}
                                 type='text'
                                 onChange={e => props.setOldTodo({...props.oldTodo, tag_id: e.target.value})}>
                        <option value='0'>Не выбрано</option>
                        {props.tags.map((tag) =>
                            <option value={tag.tag_id}>{tag.tag_name}</option>
                        )}
                    </Form.Select>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={AddNewMessage}>Обновить</Button>
                <Button variant="secondary" onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
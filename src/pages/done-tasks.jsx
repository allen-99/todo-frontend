import React, {useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Taska from "../components/Taska";
import axios from "axios";

const DoneTasks = () => {

    const [doneTodo, setDoneTodo] = useState([])
    let [columns, setColumns] = useState([])
    const [answer, setAnswer] = useState({message: ''})



    useEffect(() => {
        fetch('http://localhost:5001/done_todo', {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                setDoneTodo(response)
            })
            .catch(error => console.log(error))
    }, []) //todos

    let groupName

    useEffect(() => {
        fetch('http://localhost:5001/columns', {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                columns = response
                doneTodo.map((todo) => {
                    groupName = columns.filter((column) => todo.group_id === column.group_id)[0].group_name
                })
            })
            .catch(error => console.log(error))
    }, []) //columns




    const deleteTodo = (todo) => {
        console.log(todo)
        setDoneTodo(doneTodo.filter(m => m._id !== todo._id))
        axios.post('http://localhost:5001/delete_todo', {
            _id: todo._id
        })
            .then((response) => {
                setAnswer(response.data)
            })
    }
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Название задачи</th>
                <th>Место</th>
                <th>Описание</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
            </tr>
            </thead>
            <tbody>
            {doneTodo.map((todo) =>
                <tr>
                    <td>
                        <Button variant={"secondary"} onClick={() => deleteTodo(todo)}>
                            Удалить
                        </Button>
                    </td>
                    <td>{todo.header}</td>
                    <td>{todo.place}</td>
                    <td>{todo.text}</td>
                    <td>{todo.date_begin}</td>
                    <td>{todo.date_end}</td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default DoneTasks;
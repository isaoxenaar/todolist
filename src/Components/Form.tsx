import React, { FC } from 'react';
import '../Styles/Home.css';
import { ToDoElement } from '../Types/ToDoElement'

interface IProps {
    toDo: ToDoElement;
    handleSubmit(event:any): any;
    handleChange(event:any): any;
}

const Form: FC<IProps> = (props) => {
    return(
    <section className="form">
    <form className="form__element" onSubmit={props.handleSubmit}>
      <label>what to do?</label>
      <input id="txtTodoItemToAdd" type="text" name="title" value={props.toDo.title} onChange={props.handleChange}/>
      <label htmlFor="txtTodoDetail">elaborate on what to do:</label>
      <input id="txtTodoDetail" type="text" name="description" value={props.toDo.description} onChange={props.handleChange}/>
      <label htmlFor="txtTodoDeadline">when is the deadline?</label>
      <input id="txtTodoDeadline" type="text" name="deadline" placeholder="DD-MM-YYYY" value={props.toDo.deadline} onChange={props.handleChange}/>
      <button id="btnAddTodo" type="submit">post todo to todo-list</button>
    </form>
  </section>)
}

export default Form
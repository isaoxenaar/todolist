import React, { FC, MouseEventHandler } from 'react';
import '../Styles/Card.css';
import { ToDoElement } from '../Types/ToDoElement'

interface IProps {
    toDo: ToDoElement,
    handleSubmit(id: string | undefined | null): any;
    handleChange(el: ToDoElement): any;
}

const Form: FC<IProps>  = (props) => {
  console.log("hej i am in form" + props.toDo.id)
    return (
      <>
      <h4 className="main__header">what do you need to do?</h4>
      <section className="form">
        <form className="form__element" onSubmit={() => props.handleSubmit}>
          <label>what to do?</label>
          <input id="txtTodoItemToAdd" type="text" name="title" value={props.toDo.title} onChange={() => props.handleChange}/>
          <label htmlFor="txtTodoDetail">elaborate on what to do:</label>
          <input id="txtTodoDetail" type="text" name="description" value={props.toDo.description} onChange={() => props.handleChange}/>
          <label htmlFor="txtTodoDeadline">when is the deadline?</label>
          <input id="txtTodoDeadline" type="text" name="deadline" value={props.toDo.deadline} onChange={() => props.handleChange}/>
          <button id="btnAddTodo" type="submit">post todo to todo-list</button>
        </form>
      </section>
      </>
    )}

export default Form
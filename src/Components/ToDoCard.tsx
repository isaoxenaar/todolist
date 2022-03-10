import React, { FC } from 'react';
import '../Styles/Card.css';
import { ToDoElement } from '../Types/ToDoElement'

interface IProps {
    toDo: ToDoElement,
    removeHandler(id: string | undefined | null): any;
    doneHandler(el: ToDoElement): any;
  }

const Card: FC<IProps>  = ({toDo, removeHandler, doneHandler}) => {
    return (
        <article className="cardTxt">
          <h2 className="cardTxt__title">{toDo.title}</h2>
          <h4 className="cardTxt__description">{toDo.description}</h4>
          <h3 className="cardTxt__deadlineContainer">
            <h3 className="cardTxt__deadline">be done before:</h3>
            <h3 className="cardTxt__deadlineContent">{toDo.deadline}</h3>
          </h3>
          <section className="todo_buttons">
              <button className="todo__button--toggle-completed" onClick={() => doneHandler(toDo)}>{toDo.done? "not done yet..." : "Done!"}</button>
              <button className="todo__button--remove" onClick={() => removeHandler(toDo.id)}>delete this todo</button>
          </section>  
        </article>)
}
export default Card
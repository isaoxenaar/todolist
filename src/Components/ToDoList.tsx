import React, { FC, useState, useEffect} from 'react';
import '../Styles/List.css';
import Card from './ToDoCard';
import { ToDoElement } from '../Types/ToDoElement'

interface IProps {
  toDoes: ToDoElement[]
}

const ToDoList: FC<IProps>= (props) => {
    const arr: ToDoElement[] = props.toDoes;
    let cssClass: string = '';
    const [toDoList, setToDoList] = useState<ToDoElement[]>([]);
    
    useEffect(() => {
        setToDoList(arr);
    }, [arr]);

    useEffect(() => {
    }, [toDoList]);

    const removeHandler = (id: string | undefined | null) : any => {
        const oldList = JSON.parse(localStorage.getItem('IdList')  || '[]');
        const newList = oldList.filter((x:string) => x !== id);
        localStorage.setItem('IdList', JSON.stringify(newList));
        const newToDo = toDoList.filter((toDo:ToDoElement) => toDo.id !== id);        
        setToDoList(newToDo);
    }

    const doneHandler = (el: ToDoElement) : any => {
        const newToDo = toDoList.map(toDo => {
            if(toDo.id === el.id) 
                toDo.done ? toDo.done = false : toDo.done = true;
            return toDo;
        })
        const id: string = `${el.id}`
        const oldItem = JSON.parse(localStorage.getItem(id)  || '');
        oldItem.done = !oldItem.done;
        localStorage.setItem(id, JSON.stringify(oldItem));
        setToDoList(newToDo);
    }

    return (
    <section id="todoList">
        {toDoList.map(el => {
            if(el.id === '')
                return <section></section>
            if(el.done === false) {
                cssClass = "todo--notcompleted";
            }
            if(el.done === true) {
                cssClass = "todo--completed";
            }
            return <section className={cssClass} id={el.id}>
                        <Card removeHandler={removeHandler} doneHandler={doneHandler} toDo={el}/>
                </section>            
            }
        )}
    </section>)
}

export default ToDoList;
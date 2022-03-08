import React, { FC, useState, useEffect} from 'react';
import '../Styles/List.css';
import Card from './ToDoCard';
import { ToDoElement } from '../Types/ToDoElement'

interface IProps {
  toDoes: ToDoElement[]
}

const ToDoList: FC<IProps>= (props) => {
    const arr: ToDoElement[] = props.toDoes;
    const [toDoList, setToDoList] = useState<ToDoElement[]>([]);
    
    useEffect(() => {
        setToDoList(arr);
    }, [arr]);

    useEffect(() => {
    }, [toDoList]);

    const removeHandler = (id: string | undefined | null) : any => {
        const oldList = JSON.parse(localStorage.getItem('IdList')  || '[]');
        const newList = oldList.filter((x:string) => x !== id);
        const newToDo = toDoList.filter((toDo:ToDoElement) => toDo.id !== id);        

        localStorage.setItem('IdList', JSON.stringify(newList));
        setToDoList(newToDo);
    }

    const doneHandler = (el: ToDoElement) : any => {
        const id: string = `${el.id}`;
        
        const oldItem = JSON.parse(localStorage.getItem(id)  || '');
        oldItem.done = !oldItem.done;
        localStorage.setItem(id, JSON.stringify(oldItem));

        const newToDo = toDoList.map(toDo => {
            if(toDo.id === id) 
                toDo.done ? toDo.done = false : toDo.done = true;
            return toDo;
        })
        setToDoList(newToDo);
    }

    return (
    <section id="todoList">
        {toDoList.map(el => {
            if(el.id === '')
                return <article></article>
            return <article className={el.done ?  "todo--completed" : "todo--notcompleted"} id={el.id}>
                        <Card removeHandler={removeHandler} doneHandler={doneHandler} toDo={el}/>
                </article>            
            }
        )}
    </section>)
}

export default ToDoList;
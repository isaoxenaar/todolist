import React, {useState, useEffect, FC } from 'react';
import "../Styles/Home.css";
import { v4 } from 'uuid';
import ToDoList from './ToDoList';
import { ToDoElement } from '../Types/ToDoElement'

const Home: FC = () => {
  const initialIdList = JSON.parse(localStorage.getItem('IdList')  || '[]');
  const initialstate = initialIdList.map((el:string) => JSON.parse(localStorage.getItem(el) || ''));
  const [form, setForm] = useState<ToDoElement>({});
  const [toDoes, setToDoes] = useState<ToDoElement[]>([initialstate]);

  useEffect(() => {
  }, [form, toDoes]);
  
  useEffect(() => {
    setToDoes(initialstate);
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault(); 
    if(form.id) {
      const idList = JSON.parse(localStorage.getItem('IdList')  || '[]');
      idList.push(form.id);
      localStorage.setItem('IdList', JSON.stringify(idList));
      localStorage.setItem(form.id, JSON.stringify(form));
      const idList2 = JSON.parse(localStorage.getItem('IdList')  || '[]');
      const objects = idList2.map((x:string) => JSON.parse(localStorage.getItem(x) || ''));
      setToDoes(() => ([...objects]));
    } 
    setForm({title: '', description: '', deadline: '', done: false});
  }

  const handleChange = (event: any)=> {
      event.preventDefault();
      const { name, value } = event.target;
      const id = v4();
      setForm(prev => ({
        ...prev,
        [name]: value,
        id: id, 
        done: false
      }));
    };

  return (
    <>
      {/* <Form toDo={form} handleChange={handleChange} handleSubmit={handleSubmit} /> */}
      <h4 className="main__header">what do you need to do?</h4>
      <section className="form">
        <form className="form__element" onSubmit={handleSubmit}>
          <label>what to do?</label>
          <input id="txtTodoItemToAdd" type="text" name="title" value={form.title} onChange={handleChange}/>
          <label htmlFor="txtTodoDetail">elaborate on what to do:</label>
          <input id="txtTodoDetail" type="text" name="description" value={form.description} onChange={handleChange}/>
          <label htmlFor="txtTodoDeadline">when is the deadline?</label>
          <input id="txtTodoDeadline" type="text" name="deadline" value={form.deadline} onChange={handleChange}/>
          <button id="btnAddTodo" type="submit">post todo to todo-list</button>
        </form>
      </section>
      <ToDoList toDoes={toDoes}/>
    </>)
}

export default Home 

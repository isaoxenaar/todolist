import React, {useState, useEffect, FC } from 'react';
import "../Styles/Home.css";
import { v4 } from 'uuid';
import ToDoList from './ToDoList';
import Form from './Form';
import { ToDoElement } from '../Types/ToDoElement'

const Home: FC = () => {
  const [form, setForm] = useState<ToDoElement>({});
  const [toDoes, setToDoes] = useState<ToDoElement[]>([]);

  useEffect(() => {
  }, [form, toDoes]);
  
  useEffect(() => {
    const initialIdList = JSON.parse(localStorage.getItem('IdList')  || '[]');
    const initialstate = initialIdList.map((el:string) => JSON.parse(localStorage.getItem(el) || ''));
    setToDoes(initialstate);
  }, []);

  const handleSubmit = (event: any) : any => {
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

  const handleChange = (event: any) : any=> {
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
      <Form toDo={form} handleSubmit={handleSubmit} handleChange={handleChange}/>
      <ToDoList toDoes={toDoes}/>
    </>)
}

export default Home 

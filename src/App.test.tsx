import React from 'react';
import { render, screen } from '@testing-library/react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';
import ToDoList from './Components/ToDoList';
import Card from './Components/ToDoCard';
import { ToDoElement } from './Types/ToDoElement';

test('Renders header with correct text', () => {
  render(<App />);
  const headerElement = screen.getByText('To Do List');
  expect(headerElement).toBeInTheDocument();
});

test('Verify input txtTodoItemToAdd', () => {
  const {container} = render(<App/>);
  const pageHeaderContent = container.querySelector("#txtTodoItemToAdd")?.textContent;
  expect(pageHeaderContent).toMatch("");
})

test('Verify button btnAddTodo', () => {
  const {container} = render(<App/>);
  const pageHeaderContent = container.querySelector("#btnAddTodo")?.textContent;
  expect(pageHeaderContent).toMatch("");
})

test('Verify list todoList', () => {
  const {container} = render(<App/>);
  const pageHeaderContent = container.querySelector("#todoList")?.textContent;
  expect(pageHeaderContent).toMatch("");
})

test('Verify that the form adds a todo', () => {
    configure({ adapter: new Adapter() })
    const wrapper = mount(<App />);
    const form = wrapper.find('form');
    const inputTitle= wrapper.find('input[name="title"]');
    const inputDescription= wrapper.find('input[name="description"]');
    const inputDeadline= wrapper.find('input[name="deadline"]');
    const button = wrapper.find('#btnAddTodo');
    const card = wrapper.find('Card');
    const cardCount = card.length;
    inputTitle.simulate('change', { target: { value: 'Hello', name: 'title' } });
    inputDescription.simulate('change', { target: { value: 'Hello', name: 'description' } });
    inputDeadline.simulate('change', { target: { value: 'Hello', name: 'deadline' } });
    button.simulate('submit');
    expect(wrapper.find('Card').length).toBe(cardCount + 1);
})

test('Verify that remove button removes a todo', () => {
  configure({ adapter: new Adapter() })
  const arr: ToDoElement[] = [{title: '', description: '', deadline: '', done: false}];
  const wrapper = mount(<ToDoList toDoes={arr}/>);
  const button = wrapper.find('.todo__button--remove');
  const card = wrapper.find(Card);
  const cardCount = card.length;
  button.simulate('click');
  expect(button.length).toEqual(1);
  expect(wrapper.find('Card').length).toEqual(cardCount - 1);
})

test('Verify that toggle button toggles', () => {
  configure({ adapter: new Adapter() })
  const arr: ToDoElement[] = [{title: '', description: '', deadline: '', done: false}];
  const wrapper = mount(<ToDoList toDoes={arr}/>);
  const button = wrapper.find('.todo__button--toggle-completed');
  button.simulate('click');
  expect(button.length).toEqual(1);
  expect(arr[0].done).toEqual(true);
})

test('Counts cards in todo-List', () => {
    const arr: ToDoElement[] = [{title: '', description: '', deadline: '', done: false}, {title: '', description: '', deadline: '', done: false}];
    const element = mount(<ToDoList toDoes={arr}/>);
    expect(element.find(Card).length).toEqual(2);
});

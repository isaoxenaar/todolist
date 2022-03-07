import React from 'react';
import './App.css';
import Home from "./Components/Home"

function App() {
  return (
    <>
      <header className="header">To Do List</header>
      <main className="main">
        <Home/>
      </main>
      <footer className="main__footer">
      this was made in march 2022
      </footer>
    </>
  );
}

export default App;

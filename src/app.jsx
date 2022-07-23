import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Map } from './pages'
// Hooks
import { useSelector, useDispatch } from 'react-redux';
// Components
import { TabBar } from './components'
// Styles
import 'normalize.css';
// Selectors

const App = () => {
  const onGetReport =() => {

  }
  return (
    <>
      <TabBar  onGetReport={onGetReport}/>
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='*' element={<Map />} />
      </Routes >
    </>
  );
}

export default App;
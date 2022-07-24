import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Map, TreeReport } from './pages'
// Components
import { TabBar } from './components'
// Styles
import 'normalize.css';
// Selectors

const App = () => {
  const navigate = useNavigate()

  const onGetReport =() => {
    navigate('/tree-report');
  }

  return (
    <>
      <TabBar  onGetReport={onGetReport}/>
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='/tree-report' element={<TreeReport />} />
        <Route path='*' element={<Map />} />
      </Routes >
    </>
  );
}

export default App;
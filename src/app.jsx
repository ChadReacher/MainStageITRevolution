import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Map, TreeReport, Registr, Auth } from './pages'
// Store
import {
  useSelector, useDispatch
} from 'react-redux';
// Selectors
import { selectIsAuth, resetAuthState } from './store/auth'
// Components
import { TabBar } from './components'
// Styles
import 'normalize.css';
// Selectors

const App = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    navigate('/sign-in');
    dispatch(resetAuthState())
    localStorage.clear()
    window.location.reload(false)
  }

  return (
    <>
      <TabBar isAuth={isAuth} onLogout={logout}/>
      <Routes>
        {
          isAuth ? <>
            <Route path='/' element={<Map />} />
            <Route path='/tree-report' element={<TreeReport />} />
            <Route path='*' element={<Map />} />
          </> :
            <>
              <Route path='/' element={<Map />} />
              <Route path='/sign-up' exact element={<Registr />} />
              <Route path='/sign-in' exact element={<Auth />} />
              <Route path='*' element={<Map />} />
            </>
        }
      </Routes >
    </>
  );
}

export default App;
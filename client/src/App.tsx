import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useDispatch } from 'react-redux'
import Header from './components/global/Header';
import PageRender from './pageRender';
import Footer from './components/global/Footer';

import { Alert } from './components/alert/Alert';
import { refreshToken } from './redux/actions/authAction'; 
import { getCategories } from './redux/actions/categoryAction';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshToken() as any)
    dispatch(getCategories() as any);
  },[])
  return (
    <div className='container'>
      <Router>
        <Alert/>
        <Header/>
        <Routes>
          <Route path="/:page" element = {<PageRender/>}/>
          <Route path="/:page/:slug" element = {<PageRender/>}/>
          <Route path="/" element = {<PageRender/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App

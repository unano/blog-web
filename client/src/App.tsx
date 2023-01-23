import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useDispatch } from 'react-redux'
import Header from './components/global/Header';
import PageRender from './pageRender';
import Footer from './components/global/Footer';

import { Alert } from './components/alert/Alert';
import { refreshToken } from './redux/actions/authAction'; 
import { getCategories } from './redux/actions/categoryAction';
import { getHomeBlogs } from './redux/actions/blogAction';

import io from 'socket.io-client'

import SocketClient from './SocketClient';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshToken() as any)
    dispatch(getCategories() as any);
    dispatch(getHomeBlogs() as any);
  }, [dispatch])
  
  useEffect(() => {
    const socket = io()
    dispatch({type: 'SOCKET', payload: socket })
    return () => {socket.close()}
  },[])

  return (
    <div className='container'>
      <SocketClient/>
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

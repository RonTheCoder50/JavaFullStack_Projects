import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';   
import './App.css'

import IntroPage from './pages/intropage'
import RegisterPage from './pages/register';     
import LoginPage from './pages/login';
import DashBoard from './pages/dashBoard';
import BlogPage_Card from './pages/blogPage';
import AddBlogForm from './pages/addBlogForm';
import ProfileCard from './pages/profile';
import AboutPage from './pages/About';

function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<IntroPage />} /> 
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/blog/:id' element={<BlogPage_Card />} />
          <Route path='/blog_form' element={<AddBlogForm />} />
          <Route path='/profile' element={<ProfileCard />} /> 
          <Route path='/about' element={<AboutPage />} />
        </Routes>
     </BrowserRouter>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Chats from '../chats/Chats'
import ProtectedRoute from '../auth/ProtectedRoute'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}>
          
        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/chats' element={
          <ProtectedRoute>
            <Chats/>
          </ProtectedRoute>
        } />
    </Routes>
  )
}

export default AppRouter
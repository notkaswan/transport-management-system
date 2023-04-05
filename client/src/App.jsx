import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import ViewDriver from './pages/ViewDriver'
import axios from 'axios'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import AddDriverPage from './pages/AddDriverPage'
import AddClientPage from './pages/AddClientPage'
import AddVehiclePage from './pages/AddVehiclePage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/add/driver' element={<AddDriverPage />} />
          <Route path='/add/client' element={<AddClientPage />} />
          <Route path='/add/vehicle' element={<AddVehiclePage />} />
          <Route path='/view/driver' element={<ViewDriver />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App

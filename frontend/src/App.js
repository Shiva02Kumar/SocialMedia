import { React, useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import './components/Main.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainPanel from './components/MainPanel';
import RefreshHandler from './utils/RefreshHandler';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import SideBar from './components/SideBar';
import Search from './pages/Search';
import SidePanel from './components/SidePanel';
import HomePanel from './components/HomePanel';
import CreateGroup from './components/CreateGroup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ProtectedRoute = () => {
    console.log(isAuthenticated);

    return isAuthenticated ? (
      <div className="protectedLayout">
        <SideBar />
        <Outlet />
      </div>
    ) : <Navigate to='/signin' />
  }

  const ChatRoute = () => {
    return (
      <div className="mainComponent">
        <SidePanel />
        <Outlet />
      </div>
    )
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to='/signin' />} />
        <Route path='/signin' element={isAuthenticated ? <Navigate to='/home' /> : <SignIn />} />
        <Route path='/signup' element={isAuthenticated ? <Navigate to='/home' /> : <SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ChatRoute />}>
            <Route path='/home' element={<HomePanel />} />
            <Route path='/chats' element={<MainPanel />} />
            <Route path='/CreateGroup' element={<CreateGroup />} />
          </Route>
          <Route path='/Search' element={<Search />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

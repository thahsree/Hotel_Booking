import { useContext } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { authContext } from './context/AuthContext'
import { modeContext } from './context/DarkMode'
import { hotelColumns, roomColumns, userColumns } from './datatable'
import { hotelInputs, roomInputs, userInputs } from './formSource'
import Home from "./pages/home/Home"
import List from './pages/list/List'
import Login from './pages/login/Login'
import New from './pages/new/New'
import NewHotel from './pages/newHotel/NewHotel'
import NewRoom from './pages/newRoom/NewRoom'
import Single from './pages/single/Single'
import './styles/darkMode.css'
function App() {

  const { darkMode } = useContext(modeContext)



  const { admin } = useContext(authContext)

  const location = useLocation()

  const ProtectedRoute = () => {

    return (

      admin ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />

    )
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path='/'>

          <Route path='login' element={<Login />} />

          {/*!! protected routes */}


          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='users' element={<ProtectedRoute/>}>
            <Route index element={<List columns={userColumns}/>} />
            <Route path=':userID' element={<Single />} />
            <Route path='new' element={<New input={userInputs} title="Add new user" />} />
          </Route>
          <Route path='hotels' element={<ProtectedRoute/>}>
            <Route index element={<List columns={hotelColumns}/>} />
            <Route path=':productID' element={<Single />} />
            <Route path='new' element={<NewHotel input={hotelInputs} title="Add new hotel" />} />
          </Route>
          <Route path='rooms' element={<ProtectedRoute/>}>
            <Route index element={<List columns={roomColumns}/>} />
            <Route path=':productID' element={<Single />} />
            <Route path='new' element={<NewRoom input={roomInputs} title="Add new room" />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App

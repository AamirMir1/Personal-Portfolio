import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import "./App.css"
import Home from './Components/Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, loadUser } from './Actions/userActions'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import AddSkills from './Components/AddSkills/AddSkills'
import UpdateProfile from './Components/UpdateProfile/UpdateProfile'
import UpdatePassword from './Components/UpdatePassword/UpdatePassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import { useAlert } from 'react-alert'
const App = () => {
    const { isAuthenticated } = useSelector((state) => state.loadUser)
    const { error: detailsError } = useSelector((state) => state.getUserData)
    const dispatch = useDispatch()
    const alert = useAlert()
    useEffect(() => {
        if (detailsError) {
            alert.error(detailsError)
            dispatch({ type: "clearErrors" })
        }
    }, [alert, dispatch, detailsError])

    useEffect(() => {
        dispatch(loadUser())
        dispatch(getUserDetails())
    }, [dispatch])

    return <div className="Home">
        <div className="home-content">
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    {isAuthenticated && <Route path='/dashboard' element={<Dashboard />} />}
                    {isAuthenticated && <Route path='/skills/add' element={<AddSkills />} />}
                    {isAuthenticated && <Route path='/profile/update' element={<UpdateProfile />} />}
                    {isAuthenticated && <Route path='/password/update' element={<UpdatePassword />} />}
                    <Route path='/reset/:token' element={<ResetPassword />} />
                </Routes>

            </Router>
        </div>
    </div>
}
export default App
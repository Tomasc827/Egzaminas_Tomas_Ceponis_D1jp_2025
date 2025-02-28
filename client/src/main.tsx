import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Homepage from './components/Homepage.tsx'
import { AuthProvider } from './components/contexts/AuthContext.tsx'
import { DataProvider } from './components/contexts/DataContext.tsx'
import Registration from './components/authentication/registration.tsx'
import Login from './components/authentication/Login.tsx'
import Card from './components/Card.tsx'
import ProtectedRoute from './components/protected/ProtectedRoute.tsx'
import NotFound from './components/protected/NotFound.tsx'
import Categories from './components/Categories.tsx'
import MyAds from './components/MyAds.tsx'
import LoginRoute from './components/protected/LoginRoute.tsx'


createRoot(document.getElementById('root')!).render(
<StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<Login/>}/>
            <Route element={<LoginRoute/>}>
            <Route path='/homepage' element={<Homepage/>}/>
            <Route path='/:entityID' element={<Card/>}/>
            <Route path='/mycategories' element={<Categories/>}/>
            <Route path='/myads' element={<MyAds/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route path='/registration' element={<Registration/>}/>
              <Route path='/homepage' element={<Homepage/>}/>
              <Route path='/*' element={<NotFound/>} />
            </Route>
            <Route path='/*' element={<NotFound/>} />
            </Route>
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
</StrictMode>
)

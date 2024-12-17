import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Character from './pages/Character';
import Results from './pages/Results';
import './index.css'

// RENDER APPLICATION
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/Edit" element={<ProfileEdit />} />
          <Route path="character/:id" element={<Character />} />
          <Route path="results/:query" element={<Results />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import React from 'react'
import { Routes, Route } from 'react-router-dom'

/* ---------------------------------- page ---------------------------------- */
import HomePage from 'src/pages/Home'
import NotFoundPage from 'src/pages/NotFound'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default RoutesApp

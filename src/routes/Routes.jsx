import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from 'src/pages/Home/home'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  )
}

export default RoutesApp

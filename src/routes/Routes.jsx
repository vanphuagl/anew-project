import React from 'react'
import { Routes, Route } from 'react-router-dom'

/* ---------------------------------- page ---------------------------------- */
import { HomePage, NotFoundPage } from 'src/pages/page'

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

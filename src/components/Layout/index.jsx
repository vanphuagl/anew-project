import React from 'react'

/* --------------------------------- routes --------------------------------- */
import { BrowserRouter } from 'react-router-dom'
import RoutesApp from 'src/routes/Routes'

/* ------------------------------- components ------------------------------- */
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

const Layout = () => {
  return (
    <BrowserRouter>
      <div className='layout'>
        <Header />
        <main>
          <RoutesApp />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default Layout

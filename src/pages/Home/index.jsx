import React from 'react'

/* --------------------------------- section -------------------------------- */
import { FirstView, Emoty, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  return (
    <>
      <FirstView />
      <Emoty />
      <Intro />
      <Projects />
      <Philosophy />
      <Company />
    </>
  )
}

export default HomePage

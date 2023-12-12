import React from 'react'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  return (
    <>
      <FirstView />
      <Intro />
      <Projects />
      <Philosophy />
      <Company />
    </>
  )
}

export default HomePage

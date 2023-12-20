import React from 'react'

const Projects = ({ refProjects }) => {
  return (
    <section className='projects' id='projects' ref={refProjects}>
      <div className='projects__container'>
        <h2>Projects</h2>

        <div className='projects__showcase'>
          <div className='items'></div>
          <p>COMING SOON</p>
        </div>
      </div>
    </section>
  )
}

export default Projects

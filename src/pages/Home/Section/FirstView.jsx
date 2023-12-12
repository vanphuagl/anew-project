import React from 'react'

const FirstView = ({ refHeading }) => {
  return (
    <section className='firstview' ref={refHeading}>
      <div className='firstview__container'>
        <div className='firstview__heading'>
          <h2>
            Make changes in our daily lives while imagining a thousand years into the future. anew is a project team
            that pursues the possibilities to be the good ancestor from a product sustainability perspective. Having the
            starting point from consideration of contexts such as environmental crisis, culture, and economy, we
            research the designs and materials associated with objects. And we create and develop products with lower
            environmental impact that will be suitable for our future society.
          </h2>
        </div>
      </div>
    </section>
  )
}

export default FirstView

import React, { useState } from 'react'

const Company = () => {
  const [isLangugage, setIsLangugage] = useState('jp')

  return (
    <section className='company'>
      <div className='company__container'>
        <div className='company__left'>
          <h2>
            COMPANY <br />
            INFORMATION
          </h2>

          <div className='company__lang'>
            <p className={isLangugage == 'jp' ? 'active' : ''} onClick={() => setIsLangugage('jp')}>
              jp
            </p>
            <span>/</span>
            <p className={isLangugage == 'en' ? 'active' : ''} onClick={() => setIsLangugage('en')}>
              en
            </p>
          </div>
        </div>

        <div className='company__center'>
          {isLangugage === 'en' ? (
            <>
              <div className='company__mission'>mission en</div>
              <div className='company__info'>info en</div>
            </>
          ) : (
            <>
              <div className='company__mission'>mission jp</div>
              <div className='company__info'>info jp</div>
            </>
          )}
        </div>

        <div className='company__right'>
          {isLangugage === 'en' ? (
            <div className='company__member'>member en</div>
          ) : (
            <div className='company__member'>member jp</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Company

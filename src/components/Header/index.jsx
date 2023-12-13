import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import './Header.scss'

const Header = () => {
  const { pathname } = useLocation()
  const toggleRef = useRef(null)
  const [checked, setChecked] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  console.log('openMenu', openMenu)
  const [size, setSize] = useState({
    width: 0,
    height: 0
  })

  // ===== toggle theme =====

  useEffect(() => {
    let currentTheme = localStorage.getItem('data-theme')
    if (!currentTheme) currentTheme = 'dark'

    if (toggleRef.current) {
      toggleRef.current.checked = currentTheme === 'dark'
      setChecked(toggleRef.current.checked)
    }

    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [])

  const handleChange = (e) => {
    setChecked(e.target.checked)

    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('data-theme', 'light')
    }
  }

  // ===== toggle menu =====

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    console.log(size.width)
    if (size.width > 1023 && openMenu) {
      setOpenMenu(false)
    }
  }, [size.width, openMenu])

  const toggleMenu = (event) => {
    // event.preventDefault()
    setOpenMenu(!openMenu)
  }

  // ===== click link =====
  const scrollToTop = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  const handleLink = (path) => {
    switch (path) {
      case 'projects':
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })
        break
      case 'philosophy':
        document.getElementById('philosophy').scrollIntoView({ behavior: 'smooth' })
        break
      case 'company':
        document.getElementById('company').scrollIntoView({ behavior: 'smooth' })
        break

      default:
        break
    }
  }

  // ===== return =====
  return (
    <>
      <header className='c-header'>
        <Link to='/' className='c-header__left' onClick={scrollToTop}>
          <h1>anew inc.</h1>
        </Link>

        <div className='c-header__center'>
          <Link to='/#projects' onClick={() => handleLink('projects')}>
            projects,
          </Link>
          <Link to='/#philosophy' onClick={() => handleLink('philosophy')}>
            philosophy,
          </Link>
          <Link to='/#company' onClick={() => handleLink('company')}>
            company
          </Link>
        </div>

        <div className='c-header__right'>
          <p onClick={toggleMenu}>{!openMenu ? 'menu' : 'close'}</p>
          <label htmlFor='toggle'>
            <span>{checked ? 'dark' : 'light'}</span>
          </label>
          <input
            id='toggle'
            ref={toggleRef}
            className='toggle'
            checked={checked}
            type='checkbox'
            onChange={handleChange}
          />
        </div>
      </header>

      <div className={` ${'c-header__menu'} ${openMenu && size.width < 1023 ? `${'active'}` : ''} `}>
        <div className='top'>
          <Link
            to='/#projects'
            onClick={() => {
              toggleMenu()
              handleLink('projects')
            }}
          >
            projects
          </Link>
          <Link
            to='/#philosophy'
            onClick={() => {
              toggleMenu()
              handleLink('philosophy')
            }}
          >
            philosophy
          </Link>
          <Link
            to='/#company'
            onClick={() => {
              toggleMenu()
              handleLink('company')
            }}
          >
            company
          </Link>
        </div>

        <div className='bottom'>
          <Link to='https://instagram.com/anew__inc/' target='_blank' className='instagram'>
            INSTAGRAM
          </Link>
          <Link to='https://www.websitecarbon.com/' target='_blank' className='carbon'>
            * This website emits 0.00g of CO2 per view.
          </Link>
          <p>©︎ 2023 anew inc.</p>
        </div>
      </div>
    </>
  )
}

export default Header

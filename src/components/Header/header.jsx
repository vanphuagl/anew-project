import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './header.module.scss'

const Header = () => {
  const [checked, setChecked] = useState(true)
  const [isOpen, toggleMenuState] = useState(false)
  const toggleRef = useRef(null)

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

  const toggleMenu = (event) => {
    event.preventDefault()
    toggleMenuState(!isOpen)
  }

  // ===== return =====
  return (
    <>
      <header className={styles.header}>
        <Link to='/' className={styles.left}>
          <h1>anew inc.</h1>
        </Link>

        <div className={styles.center}>
          <Link to='/#project'>projects,</Link>
          <Link to='/#philosophy'>philosophy,</Link>
          <Link to='/#company'>company</Link>
        </div>

        <div className={styles.right}>
          <p onClick={toggleMenu}>menu</p>
          <span>{checked ? 'dark' : 'light'}</span>
          <input ref={toggleRef} className={styles.toggle} checked={checked} type='checkbox' onChange={handleChange} />
        </div>
      </header>

      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.top}>
            <Link to='/#project'>projects</Link>
            <Link to='/#philosophy'>philosophy</Link>
            <Link to='/#company'>company</Link>
          </div>

          <div className={styles.bottom}>
            <Link to='https://instagram.com/anew__inc/' target='_blank' className={styles.instagram}>
              INSTAGRAM
            </Link>
            <Link to='https://www.websitecarbon.com/' target='_blank' className={styles.carbon}>
              * This website emits 0.00g of CO2 per view.
            </Link>
            <p>©︎ 2023 anew inc.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Header

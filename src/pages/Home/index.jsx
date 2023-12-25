import React, { useEffect, useRef } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin, Power2 } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  const refQuery = {
    firstview: useRef(null),
    intro: useRef(null),
    omoty: useRef(null),
    panelTop: useRef(null),
    panelBottom: useRef(null)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    ScrollTrigger.config({ limitCallbacks: true })

    const sections = document.querySelectorAll('.vertical-scrolling')

    // this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
    // some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
    const scrolling = {
      enabled: true,
      events: 'scroll,wheel,touchmove,pointermove'.split(','),
      prevent: (e) => e.preventDefault(),
      disable() {
        if (scrolling.enabled) {
          scrolling.enabled = false
          window.addEventListener('scroll', gsap.ticker.tick, { passive: true })
          scrolling.events.forEach((e, i) =>
            (i ? document : window).addEventListener(e, scrolling.prevent, { passive: false })
          )
        }
      },
      enable() {
        if (!scrolling.enabled) {
          scrolling.enabled = true
          window.removeEventListener('scroll', gsap.ticker.tick)
          scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent))
        }
      }
    }

    function goToSection(section, i) {
      console.log('section', section, i)

      if (scrolling.enabled) {
        // skip if a scroll tween is in progress
        scrolling.disable()
        gsap.to(window, {
          scrollTo: { y: section, autoKill: false },
          onComplete: scrolling.enable,
          duration: 1
        })

        // anim && anim.restart()
      }
    }

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=1',
        end: 'bottom top+=1',
        onEnter: () => goToSection(section, i),
        onEnterBack: () => goToSection(section, i)
      })
    })
  }, [])

  return (
    <>
      <FirstView refHeading={refQuery.firstview} />
      <Intro />

      <div className='fullpage'>
        <section className='vertical-scrolling vertical-1'>
          <div className='parent'>
            <div className='child'>page 1</div>
          </div>
        </section>
        <section className='vertical-scrolling vertical-2'>
          <div className='parent'>
            <div className='child'>page 2</div>
          </div>
        </section>
        <section className='vertical-scrolling vertical-3'>
          <div className='parent'>
            <div className='child'>page 3</div>
          </div>
        </section>

        <section className='vertical-scrolling'>
          <div className='vertical-wrapper'>
            <Projects />
            <Philosophy />
            <Company />
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage

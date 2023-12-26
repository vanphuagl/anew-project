import React, { useEffect } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  // useEffect(() => {
  //   window.history.scrollRestoration = 'manual'
  // }, [])

  useEffect(() => {
    let mm = gsap.matchMedia(),
      breakPoint = 1024

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

    const loadFirstView = gsap.timeline({
      paused: 'true',
      scrollTrigger: {
        trigger: '.intro',
        toggleActions: 'play none none reverse'
      }
    })

    const loadIntro = gsap.timeline({
      paused: 'true',
      scrollTrigger: {
        trigger: '.intro',
        toggleActions: 'play none none reset'
      }
    })

    const loadProject = gsap.timeline({
      paused: 'true',
      scrollTrigger: {
        trigger: '.projects',
        toggleActions: 'play none none reverse'
      }
    })

    loadFirstView.fromTo(
      '.firstview__heading',
      {
        opacity: 1
      },
      {
        opacity: 0
      }
    )

    loadProject.to('.intro', {
      opacity: 0,
      duration: 0.5
    })

    loadIntro
      .to('.intro__left', {
        opacity: 1,
        duration: 0.5,
        delay: 1
      })
      .to('.intro__left .omoty', {
        x: 0,
        duration: 0.8,
        delay: 0.5
      })
      .to('.intro__right', {
        opacity: 1,
        duration: 0.5,
        delay: 0.5
      })
      .to('.c-scroll', {
        opacity: 1,
        duration: 0.5
      })

    function intoAnimation(section, i) {
      if (i === 1) {
        loadFirstView.play()
        loadIntro.play()

        gsap.to('.projects__title', {
          opacity: 0,
          duration: 0.5
        })
      }

      if (i === 2) {
        loadProject.play()

        gsap.to('.projects__title, .c-scroll', {
          opacity: 1,
          duration: 0.5,
          delay: 1
        })
      }

      if (i === 3) {
        gsap.to('.projects__title, .c-scroll', {
          opacity: 0,
          duration: 0.3
        })

        document.querySelector('.vertical-normal').classList.add('fade')
      } else {
        document.querySelector('.vertical-normal').classList.remove('fade')
      }
    }

    function goToSection(section, i) {
      // console.log('section', section, i)

      if (scrolling.enabled) {
        // skip if a scroll tween is in progress
        scrolling.disable()
        gsap.to(window, {
          scrollTo: { y: section, autoKill: false },
          onComplete: scrolling.enable,
          duration: 0.7
          // onEnter: () => intoAnimation(section, i)
        })

        intoAnimation(section, i)
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
      <div className='c-scroll'>
        <div className='line'>
          <span></span>
        </div>
      </div>

      <div className='fullpage'>
        <section className='vertical-scrolling vertical-firstview'>
          <FirstView />
        </section>
        <section className='vertical-scrolling vertical-intro'>
          <Intro />
        </section>
        <section className='vertical-scrolling vertical-projects'>
          <Projects />
        </section>

        <section className='vertical-scrolling vertical-normal'>
          <Philosophy />
          <Company />
        </section>
      </div>

      {/* <Projects />
      <Philosophy />
      <Company /> */}
      {/* <FirstView />
      <Intro />

      <div className='fullpage'>
        <section className='vertical-scrolling vertical-1'>
          <div className='first-view'></div>
        </section>
        <section className='vertical-scrolling vertical-2'>
          <div className='omoty'></div>
          <div className='text-top'></div>
        </section>
        <section className='vertical-scrolling vertical-3'>
          <div className='text-bottom'></div>
        </section>

        <section className='vertical-scrolling'>
          <div className='vertical-wrapper'>
            <Projects />
            <Philosophy />
            <Company />
          </div>
        </section>
      </div> */}
    </>
  )
}

export default HomePage

import React, { useRef, useEffect } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  // useEffect(() => {
  //   window.history.scrollRestoration = 'manual'
  // }, [])'

  const refProjects = useRef(null)
  const refNormal = useRef(null)
  const refScroll = useRef(null)

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
      defaults: { duration: 0.5 },
      scrollTrigger: {
        trigger: '.intro',
        toggleActions: 'play none none reverse'
      }
    })
    const loadIntro = gsap.timeline({
      paused: 'true',
      defaults: { duration: 0.5 },
      scrollTrigger: {
        trigger: '.intro',
        toggleActions: 'play none none reset'
      }
    })

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop } = context.conditions

        loadFirstView.fromTo(
          '.firstview__heading',
          {
            opacity: 1
          },
          {
            opacity: 0
          }
        )

        if (isDesktop) {
          loadIntro
            .to('.intro__left', {
              opacity: 1,
              delay: 1
            })
            .to('.intro__left .omoty', {
              x: 0,
              delay: 0.5
            })
            .to('.intro__right', {
              opacity: 1,
              onComplete: () => {
                refScroll.current.classList.add('fade')
              }
            })
        } else {
          loadIntro
            .to('.intro__left', {
              opacity: 1,
              delay: 1
            })
            .to('.intro__left .omoty', {
              opacity: 0,
              duration: 0.5,
              delay: 0.5
            })
            .to('.intro__right', {
              opacity: 1,
              onComplete: () => {
                refScroll.current.classList.add('fade')
              }
            })
        }

        return () => {
          // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
          // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
        }
      }
    )

    const intoAnimation = (section, i) => {
      if (i === 0) {
        refScroll.current.classList.remove('fade')
      }

      if (i === 1) {
        loadFirstView.play()
        loadIntro.play()

        gsap.to('.intro', {
          opacity: 1,
          delay: 1,
          duration: 0.5
        })
        gsap.to('.projects__title', {
          opacity: 0,
          duration: 0.5
        })
      }

      if (i === 2) {
        refScroll.current.classList.add('fade')

        gsap.to('.intro', {
          opacity: 0,
          duration: 0.5
        })
        gsap.to('.projects__title', {
          opacity: 1,
          delay: 1,
          duration: 0.5
        })
      }

      if (i === 3) {
        gsap.to('.projects__title', {
          opacity: 0,
          duration: 0.3
        })

        refScroll.current.classList.remove('fade')
        refNormal.current.classList.add('fade')
      } else {
        refNormal.current.classList.remove('fade')
      }
    }

    const goToSection = (section, i) => {
      if (scrolling.enabled) {
        // skip if a scroll tween is in progress
        scrolling.disable()
        gsap.to(window, {
          scrollTo: { y: section, autoKill: false },
          onComplete: scrolling.enable,
          duration: 0.7,
          onEnter: () => intoAnimation(section, i)
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

    // anchor section click
    let links = gsap.utils.toArray('.c-header__center a')
    links.forEach((a) => {
      let element = document.querySelector(a.getAttribute('href')),
        linkST = ScrollTrigger.create({
          trigger: element,
          start: 'top top'
        })
      ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center'
      })

      a.addEventListener('click', (e) => {
        e.preventDefault()
        if (scrolling.enabled) {
          scrolling.disable()
          gsap.to(window, {
            duration: 1,
            scrollTo: linkST.start,
            overwrite: 'auto',
            onComplete: scrolling.enable
          })
        }
      })
    })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY === refProjects.current.offsetTop) {
        refScroll.current.classList.add('fade')

        gsap.to('.intro', {
          opacity: 0,
          duration: 0.5
        })
        gsap.to('.projects__title', {
          opacity: 1,
          delay: 0.5,
          duration: 0.5
        })
      } else if (window.scrollY >= refNormal.current.offsetTop) {
        refScroll.current.classList.remove('fade')
        gsap.to('.projects__title', {
          opacity: 0,
          duration: 0.3
        })

        refNormal.current.classList.add('fade')
      } else {
        refNormal.current.classList.remove('fade')
      }
    }
    // clean up code
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className='c-scroll' ref={refScroll}>
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
        <section className='vertical-scrolling vertical-projects' ref={refProjects}>
          <Projects />
        </section>

        <section className='vertical-scrolling vertical-normal' ref={refNormal}>
          <Philosophy />
          <Company />
        </section>
      </div>
    </>
  )
}

export default HomePage

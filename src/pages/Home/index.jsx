import React, { useLayoutEffect, useRef } from 'react'

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
    projects: useRef(null)
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.intro__panel')
      gsap.set(panels, {
        yPercent: (i) => (i ? 100 : 0)
      })

      // scroll trigger pin spacing
      gsap.timeline({
        scrollTrigger: {
          trigger: refQuery.intro.current,
          start: 'top top',
          end: () => '+=' + 70 * panels.length + '%',
          pin: true,
          scrub: 1,
          markers: true,
          onComplete: () => {
            gsap.to('.intro__container', {
              opacity: 0,
              duration: 0.5
            })
          }
        }
      })

      // scroll trigger first view
      gsap.fromTo(
        refQuery.firstview.current,
        {
          opacity: 1,
          ease: Power2
        },
        {
          duration: 0.5,
          opacity: 0,
          ease: Power2,
          scrollTrigger: {
            trigger: refQuery.intro.current,
            start: 'top center-=200',
            toggleActions: 'play none none reverse'
          }
        }
      )

      //  trigger scroll start content
      gsap
        .timeline({
          ease: Power2,
          scrollTrigger: {
            trigger: refQuery.intro.current,
            start: 'top center-=200',
            toggleActions: 'restart none none reset',
            markers: true
          }
        })
        .from(refQuery.omoty.current, {
          opacity: 0,
          duration: 1
        })
        .from('.text-reveal .animation-1', {
          y: '200%',
          opacity: 0,
          duration: 0.5
        })
        .from(
          '.text-reveal .animation-2',
          {
            y: '200%',
            opacity: 0,
            duration: 0.5
          },
          '-=0.2'
        )
        .from('.text-reveal .animation-3', {
          y: '200%',
          opacity: 0,
          duration: 0.5
        })

      // trigger scroll content
      gsap
        .timeline({
          scrollTrigger: {
            trigger: panels[1],
            start: 'bottom-=100 center-=250',
            toggleActions: 'play none none reverse',
            markers: true
          }
        })
        .fromTo(
          panels[0],
          {
            y: 0,
            ease: Power2
          },
          {
            y: -120,
            ease: Power2,
            duration: 0.5
          }
        )
        .from(panels[1], {
          opacity: 0,
          duration: 0.5,
          ease: Power2
        })

      // trigger when scroll-end pin
      gsap.fromTo(
        refQuery.intro.current,
        {
          opacity: 1,
          ease: Power2
        },
        {
          duration: 0.5,
          opacity: 0,
          ease: Power2,
          scrollTrigger: {
            trigger: refQuery.projects.current,
            start: 'top bottom-=200',
            toggleActions: 'play none none reverse',
            markers: true
          }
        }
      )
    })

    return () => ctx.revert()
  }, [refQuery.intro, refQuery.firstview, refQuery.omoty, refQuery.projects])

  return (
    <>
      <FirstView refHeading={refQuery.firstview} />
      <Intro refIntro={refQuery.intro} refOmoty={refQuery.omoty} />
      <Projects refProjects={refQuery.projects} />
      <Philosophy />
      <Company />
    </>
  )
}

export default HomePage

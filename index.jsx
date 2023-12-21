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
    projects: useRef(null),
    panelTop: useRef(null),
    panelBottom: useRef(null)
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    // const panels = gsap.utils.toArray('.intro__panel')
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia(),
        breakPoint = 1024

      // scroll trigger pin spacing
      gsap.to('.intro', {
        scrollTrigger: {
          trigger: refQuery.intro.current,
          start: 'top top',
          end: () => '+=' + 140 + '%',
          pin: true,
          scrub: 1
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
            toggleActions: 'play none none reset',
            onEnter: function () {
              refQuery.omoty.current.classList.add('active')
            },
            onLeaveBack: function () {
              refQuery.omoty.current.classList.remove('ctive')
            }
          }
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

      mm.add(
        {
          // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
          isDesktop: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint - 1}px)`
        },
        (context) => {
          // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
          let { isDesktop } = context.conditions

          // trigger scroll content
          if (isDesktop) {
            gsap
              .timeline({
                ease: Power2,
                scrollTrigger: {
                  trigger: refQuery.panelBottom.current,
                  start: 'bottom-=100 center-=250',
                  toggleActions: 'play none none reverse'
                }
              })
              .fromTo(
                refQuery.panelTop.current,
                {
                  y: 0
                },
                {
                  y: -120,
                  duration: 0.5
                }
              )
              .from(refQuery.panelBottom.current, {
                opacity: 0,
                duration: 0.5
              })
          } else {
            gsap
              .timeline({
                ease: Power2,
                scrollTrigger: {
                  trigger: refQuery.panelBottom.current,
                  start: 'bottom+=100 center-=100',
                  toggleActions: 'play none none reverse',
                  onEnter: function () {
                    refQuery.omoty.current.classList.remove('active')
                  },
                  onLeaveBack: function () {
                    refQuery.omoty.current.classList.add('active')
                  }
                }
              })
              .fromTo(
                refQuery.panelTop.current,
                {
                  y: 0
                },
                {
                  y: '-65vh',
                  duration: 1
                }
              )
              .from(refQuery.panelBottom.current, {
                opacity: 0,
                duration: 0.5
              })
          }
          return () => {
            // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
            // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
          }
        }
      )

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
            start: 'top+=50 center-=50',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [refQuery.intro, refQuery.firstview, refQuery.omoty, refQuery.panelTop, refQuery.panelBottom, refQuery.projects])

  return (
    <>
      <FirstView refHeading={refQuery.firstview} />
      <Intro
        refIntro={refQuery.intro}
        refOmoty={refQuery.omoty}
        refPanelTop={refQuery.panelTop}
        refPanelBottom={refQuery.panelBottom}
      />
      <Projects refProjects={refQuery.projects} />
      <Philosophy />
      <Company />
    </>
  )
}

export default HomePage

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
    omoty: useRef(null)
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    let currentIndex = 0

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.intro__panel')
      gsap.set(panels, {
        yPercent: (i) => (i ? 100 : 0)
      })

      gsap.fromTo(
        refQuery.firstview.current,
        {
          autoAlpha: 1,
          ease: Power2
        },
        {
          duration: 0.3,
          autoAlpha: 0,
          ease: Power2,
          scrollTrigger: {
            trigger: refQuery.intro.current,
            start: 'top center-=250',
            toggleActions: 'play none none reverse',
            // markers: true,
            onEnter: function () {
              refQuery.omoty.current.classList.add('is-active')
              panels[0].classList.add('is-active')
            },
            onLeaveBack: function () {
              refQuery.omoty.current.classList.remove('is-active')
              panels[0].classList.remove('is-active')
            }
          }
        }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refQuery.intro.current,
          start: 'top top',
          end: () => '+=' + 100 * panels.length + '%',
          pin: true,
          scrub: 1,
          // markers: true,
          onEnter: function () {
            refQuery.omoty.current.classList.add('is-active')
            panels[0].classList.add('is-active')
          },
          onLeaveBack: function () {
            refQuery.omoty.current.classList.remove('is-active')
            panels[0].classList.remove('is-active')
          },
          onUpdate: function (self) {
            const previousIndex = currentIndex
            currentIndex = Math.floor(self.progress * panels.length)
            if (previousIndex >= panels.length || currentIndex >= panels.length) return
            if (previousIndex !== currentIndex) {
              panels[currentIndex].classList.add('is-active')
              panels[previousIndex].classList.remove('is-active')
            }
          }
        }
        // onComplete: () => console.log('end', tl.scrollTrigger.end)
      })

      panels.forEach((panel, index) => {
        if (index) {
          tl.to(
            panel,
            {
              yPercent: 0,
              ease: 'none'
            },
            '+=0.25'
          )
        }
      })
    })

    return () => ctx.revert()
  }, [refQuery.intro, refQuery.firstview, refQuery.omoty])

  return (
    <>
      <FirstView refHeading={refQuery.firstview} />
      <Intro refIntro={refQuery.intro} refOmoty={refQuery.omoty} />
      <Projects />
      <Philosophy />
      <Company />
    </>
  )
}

export default HomePage

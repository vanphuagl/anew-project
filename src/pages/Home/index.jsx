import React, { useEffect } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin, Power2 } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

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
      // console.log('section', section, i)

      if (scrolling.enabled) {
        // skip if a scroll tween is in progress
        scrolling.disable()
        gsap.to(window, {
          scrollTo: { y: section, autoKill: false },
          onComplete: scrolling.enable,
          duration: 1,
          onEnter: () => {
            // vertical - 1
            if (section.querySelector('.firstview')) {
              document.querySelector('.intro').classList.remove('show')
              setTimeout(() => {
                document.querySelector('.firstview__heading').classList.remove('hide')
              }, 500)
            }

            // vertical - 2
            if (section.querySelector('.text-top')) {
              document.querySelector('.firstview__heading').classList.add('hide')

              gsap.to('.intro__bottom', {
                opacity: 0
              })

              setTimeout(() => {
                document.querySelector('.intro').classList.add('show')

                gsap.to('.intro__head', {
                  y: 0
                })

                gsap
                  .timeline({
                    ease: Power2,
                    scrollTrigger: {
                      toggleActions: 'play none none reset'
                    }
                  })
                  .to('.intro__left .omoty', {
                    opacity: 1,
                    duration: 1
                  })
                  .to('.intro__head', {
                    opacity: 1,
                    duration: 0.5
                  })
                  .to('.text-reveal .animation-1', {
                    y: 0,
                    duration: 0.5
                  })
                  .to(
                    '.text-reveal .animation-2',
                    {
                      y: 0,
                      duration: 0.5
                    },
                    '-=0.2'
                  )
                  .to('.text-reveal .animation-3', {
                    y: 0,
                    duration: 0.5
                  })
              }, 500)
            }

            // vertical - 3
            if (section.querySelector('.text-bottom')) {
              setTimeout(() => {
                document.querySelector('.intro').classList.add('show')
              }, 500)

              gsap
                .timeline({
                  ease: Power2
                })
                .to('.intro__left .omoty', {
                  opacity: 1,
                  duration: 1
                })
                .to('.intro__head', {
                  opacity: 1,
                  duration: 0.5
                })
                .to('.text-reveal .animation-1', {
                  y: 0,
                  duration: 0.5
                })
                .to(
                  '.text-reveal .animation-2',
                  {
                    y: 0,
                    duration: 0.5
                  },
                  '-=0.2'
                )
                .to('.text-reveal .animation-3', {
                  y: 0,
                  duration: 0.5
                })

              gsap
                .timeline({
                  ease: Power2,
                  toggleActions: 'play none none reset'
                })
                .to('.intro__head', {
                  y: -120,
                  duration: 0.5
                })
                .to('.intro__bottom', {
                  opacity: 1,
                  duration: 0.5
                })
            }

            // vertical - 4
            if (section.querySelector('.vertical-wrapper')) {
              document.querySelector('.intro').classList.remove('show')
              document.querySelector('.firstview__heading').classList.add('hide')
            }
          }
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
      <FirstView />
      <Intro />

      <div className='fullpage'>
        <section className='vertical-scrolling vertical-1'>
          <div className='firstview'></div>
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
      </div>
    </>
  )
}

export default HomePage

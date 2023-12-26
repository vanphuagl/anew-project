import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

/* ------------------------------- components ------------------------------- */
import Accordion from 'src/components/Accordion'

import { data } from '../utils/accordion-data'

const Company = () => {
  const [isLangugage, setIsLangugage] = useState('jp')

  return (
    <div className='company' id='company'>
      <div className='company__container'>
        <div className='company__left'>
          <h2>
            COMPANY <br />
            INFORMATION
          </h2>

          <div className='company__lang'>
            <p className={isLangugage === 'jp' ? 'active' : ''} onClick={() => setIsLangugage('jp')}>
              jp
            </p>
            <span>/</span>
            <p className={isLangugage === 'en' ? 'active' : ''} onClick={() => setIsLangugage('en')}>
              en
            </p>
          </div>
        </div>

        <div className='company__center'>
          <div className='company__content'>
            <SwitchTransition mode='out-in'>
              <CSSTransition
                key={isLangugage}
                addEndListener={(node, done) => {
                  node.addEventListener('transitionend', done, false)
                }}
                timeout={300}
                classNames='fade'
              >
                <>
                  {isLangugage === 'jp' ? (
                    <div className='lang-jp'>
                      <h2 className='company__text'>( MISSION )</h2>

                      <div className='company__subtitle'>
                        <h3 className='company__text'>ALL BACK TO THE EARTH.</h3>
                        <p>すべてを地球に還す</p>
                      </div>

                      <div className='company__desc'>
                        <p>
                          人と地球がお互いに恩恵を得る事ができるよう、持続可能かつ透明性のある革新的な方法により、保有する喜びを感じられるプロダクトをより多くの人に届けます。
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className='lang-en'>
                      <h2 className='company__text'>( MISSION )</h2>

                      <div className='company__subtitle'>
                        <h3 className='company__text'>ALL BACK TO THE EARTH.</h3>
                      </div>

                      <div className='company__desc'>
                        <p>
                          In order for people and the earth to benefit from each other. By sustainable, transparent, and
                          innovative ways, we create products that people feel the joy of owning them.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              </CSSTransition>
            </SwitchTransition>
          </div>

          <div className='company__content pc-only'>
            <SwitchTransition mode='out-in'>
              <CSSTransition
                key={isLangugage}
                addEndListener={(node, done) => {
                  node.addEventListener('transitionend', done, false)
                }}
                timeout={300}
                classNames='fade'
              >
                <>
                  {isLangugage === 'jp' ? (
                    <div className='lang-jp'>
                      <h2 className='company__text'>( INFO )</h2>

                      <div className='company__subtitle'>
                        <h3 className='company__text'>anew inc.</h3>
                        <p>株式会社アニュウインク</p>
                      </div>

                      <div className='company__desc'>
                        <p>東京都中央区⽇本橋⼩⾈町14-7</p>
                        <p>Soil Nihonbashi 2F Soil Work</p>
                        <Link to='mailto:info@anew-inc.com'>info@anew-inc.com</Link>
                      </div>
                    </div>
                  ) : (
                    <div className='lang-en'>
                      <h2 className='company__text'>( INFO )</h2>

                      <div className='company__subtitle'>
                        <h3 className='company__text'>anew inc.</h3>
                      </div>

                      <div className='company__desc'>
                        <p>Soil Nihonbashi 2F Soil Work, 14-7, Kobunacho,</p>
                        <p>Nihonbashi, Chuo-ku, Tokyo</p>
                        <Link to='mailto:info@anew-inc.com'>info@anew-inc.com</Link>
                      </div>
                    </div>
                  )}
                </>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>

        <div className='company__right'>
          <div className='company__member'>
            <SwitchTransition mode='out-in'>
              <CSSTransition
                key={isLangugage}
                addEndListener={(node, done) => {
                  node.addEventListener('transitionend', done, false)
                }}
                timeout={300}
                classNames='fade'
              >
                <h2 className='company__text'>( MEMBER )</h2>
              </CSSTransition>
            </SwitchTransition>

            {data.map((items, i) => (
              <SwitchTransition mode='out-in' key={i}>
                <CSSTransition
                  key={isLangugage}
                  addEndListener={(node, done) => {
                    node.addEventListener('transitionend', done, false)
                  }}
                  timeout={300}
                  classNames='fade'
                >
                  <>
                    <Accordion
                      title={items.title}
                      subtitle={isLangugage === 'jp' ? items.subtitleJp : items.subtitleEn}
                      lang={isLangugage}
                      key={i}
                    >
                      {isLangugage === 'jp' ? items.textJp : items.textEn}
                    </Accordion>
                  </>
                </CSSTransition>
              </SwitchTransition>
            ))}
          </div>

          <div className='company__content sp-only'>
            <SwitchTransition mode='out-in'>
              <CSSTransition
                key={isLangugage}
                addEndListener={(node, done) => {
                  node.addEventListener('transitionend', done, false)
                }}
                timeout={300}
                classNames='fade'
              >
                <>
                  {isLangugage === 'jp' ? (
                    <div className='lang-jp'>
                      <h2 className='company__text'>( INFO )</h2>

                      <div className='company__subtitle'>
                        <h3 className='company__text'>anew inc.</h3>
                        <p>株式会社アニュウインク</p>
                      </div>

                      <div className='company__desc'>
                        <p>東京都中央区⽇本橋⼩⾈町14-7</p>
                        <p>Soil Nihonbashi 2F Soil Work</p>
                        <Link to='mailto:info@anew-inc.com'>info@anew-inc.com</Link>
                      </div>
                    </div>
                  ) : (
                    <div className='lang-en'>
                      <h2 className='company__text'>( INFO )</h2>

                      <div className='company__subtitle'>
                        <h3 className='company__text'>anew inc.</h3>
                      </div>

                      <div className='company__desc'>
                        <p>Soil Nihonbashi 2F Soil Work, 14-7, Kobunacho,</p>
                        <p>Nihonbashi, Chuo-ku, Tokyo</p>
                        <Link to='mailto:info@anew-inc.com'>info@anew-inc.com</Link>
                      </div>
                    </div>
                  )}
                </>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Company

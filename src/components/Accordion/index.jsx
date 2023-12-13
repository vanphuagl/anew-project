import React from 'react'

import './Accordion.scss'

/* ---------------------------------- hooks --------------------------------- */
import useAccordion from 'src/hooks/useAccordion'

const Accordion = ({ title, subtitle, children, lang }) => {
  const [isOpen, toggle, refContentBody, height] = useAccordion()
  return (
    <div className={` ${'accordion'} ${lang === 'en' ? `${'lang-en'}` : ''} ${isOpen ? `${'active'}` : ''}   `}>
      <div className='accordion__header' onClick={toggle}>
        <div className='accordion__heading'>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className='accordion__icon'>
          <svg aria-label='plus' xmlns='http://www.w3.org/2000/svg' width={12} height={12} viewBox='0 0 12 12'>
            <g id='Group_78' data-name='Group 78' transform='translate(-1195 -3556.5)'>
              <line
                id='Line_3'
                data-name='Line 3'
                x2={12}
                transform='translate(1195 3562.5)'
                fill='none'
                stroke='#3b720e'
                strokeWidth={1}
              />
              <line
                id='Line_4'
                data-name='Line 4'
                x2={12}
                transform='translate(1201 3556.5) rotate(90)'
                fill='none'
                stroke='#3b720e'
                strokeWidth={1}
              />
            </g>
          </svg>
        </div>
      </div>

      <div className='accordion__content' style={{ height }}>
        <div ref={refContentBody} className='accordion__content-body'>
          <div dangerouslySetInnerHTML={{ __html: children }} />
        </div>
      </div>
    </div>
  )
}

export default Accordion

import { useState } from 'react'

export function Carousel({ items, renderItem, label = 'Carousel' }) {
  const [current, setCurrent] = useState(0)
  const count = items.length
  const goTo = (index) => setCurrent((index + count) % count)

  if (!count) return null

  return <section className="carousel" aria-roledescription="carousel" aria-label={label}>
    <div className="carousel-viewport" tabIndex="0" onKeyDown={(event) => {
      if (event.key === 'ArrowLeft') goTo(current - 1)
      if (event.key === 'ArrowRight') goTo(current + 1)
    }}>
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {items.map((item, index) => <article className="carousel-slide" key={item.id ?? index} aria-roledescription="slide" aria-label={`${index + 1} of ${count}`} aria-hidden={index !== current}>{renderItem(item)}</article>)}
      </div>
    </div>
    <div className="carousel-controls">
      <div className="carousel-buttons"><button type="button" className="carousel-button" aria-label="Previous testimonial" onClick={() => goTo(current - 1)}>←</button><button type="button" className="carousel-button" aria-label="Next testimonial" onClick={() => goTo(current + 1)}>→</button></div>
      <div className="carousel-dots" aria-label="Choose testimonial">{items.map((item, index) => <button type="button" key={item.id ?? index} className={`carousel-dot ${index === current ? 'is-active' : ''}`} aria-label={`Show testimonial ${index + 1}`} aria-current={index === current ? 'true' : undefined} onClick={() => goTo(index)} />)}</div>
      <span className="carousel-count" aria-live="polite">{String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
    </div>
  </section>
}

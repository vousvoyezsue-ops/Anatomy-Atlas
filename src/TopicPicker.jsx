import { useEffect } from 'react'
import { SECTIONS } from './data/syllabus.js'

export default function TopicPicker({ covered, counts, selected, onChange, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const toggle = (key) => {
    const next = new Set(selected)
    next.has(key) ? next.delete(key) : next.add(key)
    onChange(next)
  }

  const setSection = (sectionId, on) => {
    const next = new Set(selected)
    for (const key of covered) if (key.startsWith(`${sectionId}.`)) on ? next.add(key) : next.delete(key)
    onChange(next)
  }

  return (
    <div className="sheet" role="dialog" aria-label="Choose topics">
      <div className="sheet-body">
        {SECTIONS.map((section) => (
          <section key={section.id} className="section">
            <header className="section-head">
              <h2>{section.title}</h2>
              <span>
                <button onClick={() => setSection(section.id, true)}>all</button>
                <button onClick={() => setSection(section.id, false)}>none</button>
              </span>
            </header>
            <ol>
              {section.questions.map((q, i) => {
                const key = `${section.id}.${i + 1}`
                const available = covered.has(key)
                return (
                  <li key={key}>
                    <button
                      className={`row ${selected.has(key) ? 'on' : ''}`}
                      disabled={!available}
                      onClick={() => toggle(key)}
                      aria-pressed={selected.has(key)}
                    >
                      <span className="tick" aria-hidden />
                      <span className="num">{i + 1}</span>
                      <span className="q">{q}</span>
                      <span className="n">{available ? counts[key] : '—'}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>
      <footer className="sheet-foot">
        <span className="muted">— no 3D model in BodyParts3D</span>
        <button className="again" onClick={onClose} disabled={selected.size === 0}>
          Start
        </button>
      </footer>
    </div>
  )
}

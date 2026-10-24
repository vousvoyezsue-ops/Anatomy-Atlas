import { useEffect, useMemo, useRef, useState } from 'react'
import Specimen, { preload } from './Specimen.jsx'
import { STRUCTURES } from './data/structures.js'
import { SECTIONS } from './data/syllabus.js'

const ROMAN = { 1: 'I', 2: 'II' }

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim()

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// "Superior vena cava", 4 → "Supe··· ···· ····"
const mask = (name, shown) =>
  [...name].map((c, i) => (i < shown || c === ' ' ? c : '·')).join('')

function topicLabel(key) {
  const [section, q] = key.split('.')
  const title = SECTIONS.find((s) => s.id === section).questions[q - 1]
  return { short: `${ROMAN[section]}·${q}`, title }
}

// Only questions that have at least one model are offered as filters.
const COVERED = new Set(STRUCTURES.flatMap((s) => s.topics))

export default function App() {
  const [filter, setFilter] = useState('all')
  const [deck, setDeck] = useState([])
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [hint, setHint] = useState(0)
  const [status, setStatus] = useState('typing') // typing | correct | revealed
  const [score, setScore] = useState({ clean: 0, done: 0 })
  const inputRef = useRef(null)

  const pool = useMemo(() => {
    if (filter === 'all') return STRUCTURES
    if (filter.length === 1) return STRUCTURES.filter((s) => s.topics.some((t) => t.startsWith(`${filter}.`)))
    return STRUCTURES.filter((s) => s.topics.includes(filter))
  }, [filter])

  const restart = () => {
    setDeck(shuffle(pool))
    setIndex(0)
    setInput('')
    setHint(0)
    setStatus('typing')
    setScore({ clean: 0, done: 0 })
  }

  useEffect(restart, [pool])

  const card = deck[index]
  const finished = deck.length > 0 && index >= deck.length

  useEffect(() => {
    if (deck[index + 1]) preload(deck[index + 1].id)
    inputRef.current?.focus()
  }, [deck, index])

  const answers = useMemo(() => (card ? [card.name, ...card.aliases].map(normalize) : []), [card])

  const next = () => {
    setIndex((i) => i + 1)
    setInput('')
    setHint(0)
    setStatus('typing')
  }

  const onChange = (e) => {
    if (status !== 'typing') return
    const value = e.target.value
    setInput(value)
    if (answers.includes(normalize(value))) {
      setStatus('correct')
      setScore((s) => ({ clean: s.clean + (hint === 0 ? 1 : 0), done: s.done + 1 }))
      setTimeout(next, 750)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      if (status === 'typing') setHint((h) => Math.min(h + 1, card.name.length))
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (status === 'typing') {
        setStatus('revealed')
        setScore((s) => ({ ...s, done: s.done + 1 }))
      } else if (status === 'revealed') next()
    }
  }

  const topic = card && topicLabel(card.topics[0])

  return (
    <main className="page" onClick={() => inputRef.current?.focus()}>
      <header className="top">
        <span className="mark">Splanchnology</span>
        <select className="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All structures</option>
          {SECTIONS.map((section) => (
            <optgroup key={section.id} label={section.title}>
              <option value={section.id}>All of {section.title}</option>
              {section.questions.map((q, i) => {
                const key = `${section.id}.${i + 1}`
                return COVERED.has(key) ? (
                  <option key={key} value={key}>
                    {i + 1}. {q}
                  </option>
                ) : null
              })}
            </optgroup>
          ))}
        </select>
        <span className="count">
          {Math.min(index + 1, deck.length)} / {deck.length}
        </span>
      </header>

      {finished ? (
        <section className="done">
          <p className="done-figure">
            {score.clean}
            <span> / {deck.length}</span>
          </p>
          <p className="muted">named without hints</p>
          <button className="again" onClick={restart}>
            Again
          </button>
        </section>
      ) : (
        card && (
          <>
            <section className="stage">
              <Specimen id={card.id} kind={card.kind} />
            </section>

            <section className="prompt">
              <p className="topic">
                <span>{topic.short}</span> {topic.title}
              </p>

              <div className={`answer ${status}`}>
                <input
                  ref={inputRef}
                  value={status === 'revealed' ? card.name : input}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  readOnly={status !== 'typing'}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Name this structure"
                  placeholder="name this structure"
                />
              </div>

              <p className="hint" aria-live="polite">
                {status === 'typing' && hint > 0 ? mask(card.name, hint) : '\u00a0'}
              </p>

              <p className="keys">
                {status === 'revealed' ? (
                  <><kbd>enter</kbd> next</>
                ) : (
                  <><kbd>tab</kbd> hint <span className="dot">·</span> <kbd>enter</kbd> reveal</>
                )}
              </p>
            </section>
          </>
        )
      )}

      <footer className="credit">
        3D models: BodyParts3D © DBCLS, CC BY-SA 2.1 JP (re-oriented, simplified, names modified)
      </footer>
    </main>
  )
}

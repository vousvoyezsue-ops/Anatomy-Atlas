import { useEffect, useMemo, useRef, useState } from 'react'
import Specimen from './Specimen.jsx'
import TopicPicker from './TopicPicker.jsx'
import { loadAnatomy } from './anatomy.js'
import { STRUCTURES } from './data/structures.js'
import { SECTIONS } from './data/syllabus.js'

const ROMAN = { 1: 'I', 2: 'II' }
const MODEL_URL = `${import.meta.env.BASE_URL}${import.meta.env.VITE_MODEL_FILE ?? 'anatomy.glb'}`
const STORE_KEY = 'splanchnology.topics'

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
const mask = (name, shown) => [...name].map((c, i) => (i < shown || c === ' ' ? c : '·')).join('')

function topicLabel(key) {
  const [section, q] = key.split('.')
  const title = SECTIONS.find((s) => s.id === section).questions[q - 1]
  return { short: `${ROMAN[section]}·${q}`, title }
}

// Questions with at least one model, and how many structures each has.
const COUNTS = {}
for (const s of STRUCTURES) for (const t of s.topics) COUNTS[t] = (COUNTS[t] ?? 0) + 1
const COVERED = new Set(Object.keys(COUNTS))

function loadTopics() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY))
    const valid = saved?.filter((k) => COVERED.has(k))
    if (valid?.length) return new Set(valid)
  } catch {}
  return new Set(COVERED)
}

function saveTopics(set) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify([...set]))
  } catch {}
}

export default function App() {
  const [anatomy, setAnatomy] = useState(null)
  const [failed, setFailed] = useState(false)
  const [topics, setTopics] = useState(loadTopics)
  const [picking, setPicking] = useState(false)
  const [deck, setDeck] = useState([])
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [hint, setHint] = useState(0)
  const [status, setStatus] = useState('typing') // typing | correct | revealed
  const [clean, setClean] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    loadAnatomy(MODEL_URL).then(setAnatomy, () => setFailed(true))
  }, [])

  const pool = useMemo(() => STRUCTURES.filter((s) => s.topics.some((t) => topics.has(t))), [topics])

  const restart = () => {
    setDeck(shuffle(pool))
    setIndex(0)
    setInput('')
    setHint(0)
    setStatus('typing')
    setClean(0)
  }

  useEffect(restart, [pool])

  const card = deck[index]
  const finished = deck.length > 0 && index >= deck.length

  useEffect(() => {
    if (!picking) inputRef.current?.focus()
  }, [index, picking, anatomy])

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
      if (hint === 0) setClean((n) => n + 1)
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
      if (status === 'typing') setStatus('revealed')
      else if (status === 'revealed') next()
    }
  }

  const changeTopics = (set) => {
    setTopics(set)
    saveTopics(set)
  }

  // Name the question the student picked, not just the card's first one.
  const topic = card && topicLabel(card.topics.find((t) => topics.has(t)) ?? card.topics[0])

  return (
    <main className="page">
      <header className="top">
        <span className="mark">Splanchnology</span>
        <button className="filter" onClick={() => setPicking(true)}>
          {topics.size === COVERED.size ? 'All topics' : `${topics.size} topics`}
        </button>
        <span className="count">
          {Math.min(index + 1, deck.length)} / {deck.length}
        </span>
      </header>

      {picking ? (
        <TopicPicker
          covered={COVERED}
          counts={COUNTS}
          selected={topics}
          onChange={changeTopics}
          onClose={() => topics.size && setPicking(false)}
        />
      ) : finished ? (
        <section className="done">
          <p className="done-figure">
            {clean}
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
            <section className="stage" onClick={() => inputRef.current?.focus()}>
              {anatomy ? (
                <Specimen anatomy={anatomy} ids={card.fma} />
              ) : (
                <p className="loading">{failed ? 'The models could not be loaded.' : 'Loading specimens…'}</p>
              )}
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
                {status === 'typing' && hint > 0 ? mask(card.name, hint) : ' '}
              </p>

              <p className="keys">
                {status === 'revealed' ? (
                  <>
                    <kbd>enter</kbd> next
                  </>
                ) : (
                  <>
                    <kbd>tab</kbd> hint <span className="dot">·</span> <kbd>enter</kbd> reveal
                  </>
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

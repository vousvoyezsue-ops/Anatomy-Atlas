import { createRoot } from 'react-dom/client'
import Figure from './Figure.jsx'
import { VIEWS } from './data/views.js'
import './embed.css'

const id = new URLSearchParams(location.search).get('v')

createRoot(document.getElementById('root')).render(
  VIEWS[id] ? <Figure view={VIEWS[id]} /> : <p className="status">Unknown figure “{id}”.</p>,
)

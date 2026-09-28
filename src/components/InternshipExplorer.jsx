import { useEffect, useState } from 'react'
import { loadInternships } from '../services/internshipService'

function Arrow() { return <span aria-hidden="true">↗</span> }

function InternshipCard({ item }) {
  return <a className="internship-card" href="/jobs"><div className={`category-icon ${item.tone}`}>{item.icon}</div><div className="card-main"><div className="card-meta"><span>{item.meta}</span><span className="card-arrow"><Arrow /></span></div><h3>{item.title}</h3><p>{item.description}</p><div className="card-tags"><span>{item.duration}</span><span>{item.level}</span></div></div></a>
}

export function InternshipExplorer({ loader = loadInternships }) {
  const [state, setState] = useState({ status: 'loading', items: [], message: '' })
  const load = () => {
    setState({ status: 'loading', items: [], message: '' })
    loader().then((items) => setState({ status: items.length ? 'success' : 'empty', items, message: '' })).catch((error) => setState({ status: 'error', items: [], message: error.message }))
  }

  useEffect(() => { load() }, [loader])

  if (state.status === 'loading') return <div className="internship-grid" role="status" aria-label="Loading internships">{[1, 2, 3, 4, 5, 6].map((item) => <div className="internship-skeleton" key={item}><span /><div><i /><i /><i /></div></div>)}</div>
  if (state.status === 'error') return <div className="content-state error-state" role="alert"><strong>We couldn’t load the paths just now.</strong><p>{state.message}</p><button className="button button-light" type="button" onClick={load}>Try again <span aria-hidden="true">↻</span></button></div>
  if (state.status === 'empty') return <div className="content-state" role="status"><strong>No internship paths are open right now.</strong><p>Check back soon for the next set of opportunities.</p></div>
  return <div className="internship-grid">{state.items.map((item) => <InternshipCard key={item.title} item={item} />)}</div>
}

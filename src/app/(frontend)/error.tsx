'use client'

export default function FrontendError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="oauth-popup">
      <div className="oauth-popup-mark">H27</div>
      <h1>WE HIT A TECHNICAL ISSUE</h1>
      <p>The HACK 2027 experience is still available. Please retry this page.</p>
      <button className="button" type="button" onClick={reset}>
        Retry
      </button>
    </main>
  )
}
